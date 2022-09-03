import {db} from "../../lib/database";
import {writeFileSync} from "fs";
import type {Action, PageServerLoad} from "./$types";
import {error, redirect} from "@sveltejs/kit";
import {isEmpty} from "../../lib/util";

export const load: PageServerLoad = async ({request, params, locals}) => {
    if(!locals.user?.userId){
        throw redirect(301, "/login")
    }

    const subjects = await db.subject.findMany()
    if (subjects) {
        return {subjects}
    }

    throw error(404, "subject not found")
}


export const POST: Action = async ({request, params, locals}) => {

    const data = await request.json();
    let {name, abbreviation} = data;


    if (!isEmpty(name) && !isEmpty(abbreviation)) {
        const subject = await db.subject.create({
            data: {
                name,
                abbreviation
            }
        })
        return {
            status: 201,
            errors: {subject}
        }
    }

    return {
        status: 400,
        errors: {reason: `name ${name} or abbreviation ${abbreviation} not valid`}
    }
}