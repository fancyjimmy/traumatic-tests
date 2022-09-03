import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import * as cookie from 'cookie'

import { db } from '$lib/database'


const session: Handle = async ({ event, resolve }) => {
    const cookieHeader = event.request.headers.get('cookie')
    const cookies = cookie.parse(cookieHeader ?? '')

    if (!cookies.session) {
        event.locals.user = null
        return await resolve(event)
    }

    const session = await db.session.findFirst({
        where: {
            userAuthToken: cookies.session
        },
        include: {
            user: {
                include: {
                    userRole: {
                        include: {
                            role: true
                        }
                    }
                }
            }
        }
    })

    if (session) {
        let role = null
        if (session.user.userRole) {
            role = session.user.userRole.role.name
        }
        let user = {
            username: session.user.username,
            userId: session.user.id,
            userRole: role,
            session: session.userAuthToken
        }
        event.locals.user = user
    } else {
        event.locals.user = null
    }

    return await resolve(event)
}

const authGuardProducer = (role: string, paths: string[]): Handle => {
    const authGuard: Handle = async ({ event, resolve }) => {
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            if (event.url.pathname === path) {
                if (event.locals.user && event.locals.user.userRole === role) {
                    return await resolve(event)
                } else {
                    return Response.redirect(`${event.url.origin}/login`, 300); 
                }
            }
        }
        return await resolve(event)
    }
    return authGuard;
}


const loginRedirect: Handle = async ({ event, resolve }) => {
    if (event.locals.user?.session && event.url.pathname == "\login") {
        return Response.redirect(`${event.url.origin}/logout`, 300); 
    }

    return await resolve(event)
}

export const handle = sequence(session)