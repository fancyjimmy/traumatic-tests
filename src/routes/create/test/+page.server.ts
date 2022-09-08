import { requireUserOrRedirect } from '$lib/util';
import type {PageServerLoad, Action} from "./$types";
import {writeFileSync} from 'fs';
import {db} from "$lib/database";
import {error} from "@sveltejs/kit";


export const load: PageServerLoad = async ({request, params, locals}) => {
    requireUserOrRedirect(locals.user, 300, "/login");

    let subjects = await db.subject.findMany();
    let teachers = await db.teacher.findMany();

    return {
        user: locals.user,
        subjects,
        teachers
    }
}

export const POST: Action = async ({request, params}) => {

    const data: any = Object.fromEntries(await request.formData());

    writeFileSync(`static/uploads/${"TEST"}_${Date.now()}.png`, data["image"], 'base64')
}