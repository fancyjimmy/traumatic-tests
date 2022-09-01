import type {RequestHandler} from "@sveltejs/kit";
import {isEmpty, matchesPasswordStandard} from "$lib/util";
import {error} from "@sveltejs/kit";
import {db} from "$lib/database";
import bcrypt from "bcrypt";
import cuid from "cuid";

import cookie from "cookie";

const TIME_OUT : number = 10_800; // 3 hours in seconds

export const POST: RequestHandler = async({request, setHeaders}) => {

    const data = await request.json()

    let {username, password} = data
    let [usersWithSameName] = await Promise.all([db.user.findFirst({
        where: {
            username: {
                equals: username
            }
        }
    })])

    if (!usersWithSameName){
        throw error(404, "no user with given username")
    }

    const passwordMatches = await bcrypt.compare(password, usersWithSameName.passwordHash)

    if (!passwordMatches){
        throw error(400, "wrong password")
    }

    let authToken = cuid()

    const session = await db.session.upsert({
        update: {
            duration: TIME_OUT,
            userAuthToken: authToken
        },
        create: {
            userId: usersWithSameName.id,
            duration: TIME_OUT,
            userAuthToken: authToken
        },
        where: {
            userId: usersWithSameName.id
        },
        include: {
            user: {
                include: {
                    userRole:{
                        include: {
                            role : true
                        }
                    }
                }
            }
        }
    })

    setHeaders({
        'set-cookie': cookie.serialize("session", authToken, {maxAge: TIME_OUT, path: "/"})
    })

    let user = {}
    if (session) {
        let role = null
        if (session.user.userRole){
            role = session.user.userRole.role.name
        }
        user = {
            username: session.user.username,
            userId: session.user.id,
            userRole: role,
            session: session.userAuthToken
        }
    }

    return new Response(JSON.stringify(user), {status: 200, statusText: "successfully logged in"})
}