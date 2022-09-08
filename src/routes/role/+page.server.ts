import { error } from '@sveltejs/kit';
import { getSchoolStartYear, getSchoolYear, isEmpty } from '$lib/util';
import { db } from '$lib/database';
import { requireUserOrRedirect } from '$lib/util';
import type { PageServerLoad, Action } from "./$types";
import { grades, gradeNames } from "$lib/values";


export const load: PageServerLoad = async ({ locals }) => {
    requireUserOrRedirect(locals.user, 300, "/login");

    let roles = await db.role.findMany();
    let roleRequest = await db.roleRequest.findFirst({
        where: {
            userId: locals.user?.userId
        },
        include: {
            role: true
        }
    });
    return {
        roles,
        roleRequest,
        grades,
        gradeNames
    };

}

export const POST: Action = async ({ request, locals }) => {
    if (!locals.user) {
        return {
            status: 401,
            errors: { message: "No User Given" }
        }
    }
    const data = await request.json();
    let { grade, gradeName, roleId } = data;

    let userId = locals.user?.userId

    console.log(grade)
    if (isNaN(grade)) {
        return {
            status: 457,
            errors: { reason: "grade has to be a number" }
        }
    }

    grade = Number.parseInt(grade);
    if (!grades.includes(grade)) {
        return {
            status: 458,
            errors: { reason: "grade is invalid" }
        };
    }

    let gradeYear = getSchoolStartYear(grade);

    if (isEmpty(gradeName) || !gradeNames.includes(gradeName)) {
        return {
            status: 459,
            errors: { reason: "name of grade is invalid" }
        };
    }

    let createGrade = await db.grade.upsert({
        where: {
            year_name: {
                year: gradeYear,
                name: gradeName
            },
        },
        update: {},
        create: {
            year: gradeYear,
            name: gradeName
        }
    })

    let req = await db.roleRequest.create({
        data: {
            roleId,
            userId,
            gradeYear,
            gradeName
        }
    });

    console.log(req);
    if (!req) {
        return {
            status: 500,
            errors: { reason: "Not created successfully" }
        };
    }

    return {
        status: 200,
        errors: {}
    }

}