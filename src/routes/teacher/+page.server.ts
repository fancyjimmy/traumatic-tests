import {db} from "$lib/database";
import {writeFileSync} from "fs";
import type {Action, PageServerLoad} from "./$types";
import {error, redirect} from "@sveltejs/kit";
import {isEmpty} from "$lib/util";

export const load: PageServerLoad = async ({request, params, locals}) => {
    if(!locals.user?.userId){
        throw redirect(301, "/login")
    }

    const teachers = await db.teacher.findMany()
    if (teachers) {
        return {teachers}
    }

    throw error(404, "teachers not found")
}
