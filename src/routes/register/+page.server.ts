import type { PageServerLoad } from './$types';
import { redirect, type Action } from "@sveltejs/kit";
import { isEmpty, matchesPasswordStandard } from "$lib/util";
import { error } from "@sveltejs/kit";
import { db } from "$lib/database";
import { grades, gradeNames } from "$lib/values";
import bcrypt from "bcrypt";
import cuid from "cuid";

import cookie from "cookie";

const TIME_OUT: number = 10_800; // 3 hours in seconds

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(300, "/logout");
    }


}

export const POST: Action = async ({ request, setHeaders, locals }) => {
    if (locals.user) {
        return {
            status: 300,
            location: "/logout"
        }
    }

    const data = await request.json()

    let { username, password } = data


    if (isEmpty(username) || isEmpty(password)) {
        return {
            status: 455,
            errors: { reason: "username and password can't be empty" }
        }
    }

    if (!matchesPasswordStandard(password)) {
        return {
            status: 456,
            errors: { reason: "password doesn't meet minimum requirements" }
        }
    }

    let usersWithSameName = await db.user.findFirst({
        where: {
            username: {
                equals: username
            }
        }
    })

    if (usersWithSameName != null) {
        return {
            status: 409,
            errors: { reason: "username is already used" }
        }
    }

    let salt = bcrypt.genSaltSync(12);
    let hash = bcrypt.hashSync(password, salt);
    let user = await db.user.create({
        data: {
            username,
            passwordHash: hash,
        }
    });

    if (user) {
        return {
            status: 201,
            location: "/"
        }
    }

    return {
        status: 500
    }


}