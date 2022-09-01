import type { Handle } from '@sveltejs/kit'
import * as cookie from 'cookie'

import { db } from '$lib/database'

export const handle: Handle = async ({event, resolve}) => {
    const cookieHeader = event.request.headers.get('cookie')
    const cookies = cookie.parse(cookieHeader ?? '')

    if (!cookies.session) {
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
        if (!event.locals.user) {
            let role = null
            if (session.user.userRole){
                role = session.user.userRole.role.name
            }
            event.locals.user = {
                username: session.user.username,
                userId: session.user.id,
                userRole: role,
                session: session.userAuthToken
            }
        } else {
            event.locals.user.username = session.user.username
            event.locals.user.userId = session.userId
            if (session.user.userRole){
                event.locals.user.userRole = session.user.userRole.role.name
            }
            event.locals.user.session = session.userAuthToken
        }

    }

    return await resolve(event)
}