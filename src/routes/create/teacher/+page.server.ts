import {db} from "$lib/database";
import {writeFileSync} from "fs";
import type {Action, PageServerLoad} from "./$types";
import {error, redirect} from "@sveltejs/kit";
import {isEmpty, requireUserOrRedirect} from "$lib/util";

export const load: PageServerLoad = async ({request, params, locals}) => {
    requireUserOrRedirect(locals.user, 300, "login");

    const teachers = await db.teacher.findMany()
    if (teachers) {
        return {teachers}
    }

    throw error(404, "teachers not found")
}


export const POST: Action = async ({request, params, locals}) => {

    const data = await request.json();
    let {firstname, lastname, abbreviation} = data;


    firstname = firstname ?? null


    if (!(isEmpty(lastname) || isEmpty(abbreviation) || abbreviation.length != 4)) {
        const teacher = await db.teacher.create({
            data: {
                firstname,
                lastname,
                abbreviation
            }
        });


        return {
            status: 201,
            errors: {teacher}
        }
    }

    return {
        status: 400,
        errors: {reason: `Name ${firstname ?? "" } ${lastname} or Abbreviation ${abbreviation} not valid`}
    }
}