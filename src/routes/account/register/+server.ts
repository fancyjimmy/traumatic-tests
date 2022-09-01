import type {RequestHandler} from "@sveltejs/kit";
import {isEmpty, matchesPasswordStandard} from "$lib/util";
import {error} from "@sveltejs/kit";
import {db} from "$lib/database";
import bcrypt from "bcrypt";

export const POST: RequestHandler = async({request}) => {
    const data = await request.json()
    let {username, password} = data;

    if (isEmpty(username) || isEmpty(password)){
        throw error(400, "username and password can't be empty")
    }

    if (!matchesPasswordStandard(password)){
        throw error(400, "password doesn't meet minimum requirements")
    }

    let usersWithSameName = await db.user.findFirst({
        where: {
            username: {
                equals: username
            }
        }
    })

    if (usersWithSameName != null){
        throw error(409, "username is already used");
    }

    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(password, salt);
    let user = await db.user.create({
        data: {
            username,
            passwordHash: hash
        }
    });



    return new Response(JSON.stringify({username: user.username, createdAt: user.createdAt}), {status: 201, statusText: "User created"})
}