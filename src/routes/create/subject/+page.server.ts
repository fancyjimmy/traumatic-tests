import {db} from "$lib/database";
import {writeFileSync} from "fs";
import type {Action, PageServerLoad} from "./$types";
import {error, redirect} from "@sveltejs/kit";
import {isEmpty, requireUserOrRedirect} from "$lib/util";

export const load: PageServerLoad = async ({request, params, locals}) => {
   
    requireUserOrRedirect(locals.user, 300, "/login");

    const subjects = await db.subject.findMany()
    if (subjects) {
        return {subjects}
    }

    throw error(404, "subject not found")
}
