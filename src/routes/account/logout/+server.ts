import type {RequestHandler} from "@sveltejs/kit";
import {isEmpty, matchesPasswordStandard} from "$lib/util";
import {error, redirect} from "@sveltejs/kit";
import {db} from "$lib/database";
import bcrypt from "bcrypt";

export const POST: RequestHandler = async({request, locals}) => {
    if (!locals.user.userId){
        throw error(400, "No Account to logout from")
    }

    let update = await db.session.update(
        {
            data: {
                userAuthToken: null,
            },
            where: {
                userId: locals.user.userId
            }
        }
    )

    return redirect(300, "/")
}