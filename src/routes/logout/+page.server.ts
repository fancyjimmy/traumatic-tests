import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Action} from "./$types"
import { db } from '$lib/database';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(300, "/login")
    }

    return {
        user: locals.user
    }
}

export const POST: Action = async ({ locals }) => {
    if (!locals.user?.userId) {
        return {
            status: 400,
            errors: "No User Found"
        }
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

    return {
        status: 200,
        location: "/login"
    }
}