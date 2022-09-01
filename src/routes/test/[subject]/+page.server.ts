import type {PageServerLoad, Action} from "./$types";
import {writeFileSync} from 'fs';
import {db} from "$lib/database";
import {error} from "@sveltejs/kit";


export const load: PageServerLoad = async ({request, params}) => {
    const tests = await db.test.findMany({
        where: {
            subject: {
                name: {
                    equals: params.subject
                }
            }
        }
    });

    if (tests) {
        console.log(tests)
        return {tests}
    }

    throw error(404, "Subject not found");
}

export const POST: Action = async ({request, params}) => {

    const data: any = Object.fromEntries(await request.formData());

    writeFileSync(`static/uploads/${params.subject}_${Date.now()}.png`, data["image"], 'base64')
}