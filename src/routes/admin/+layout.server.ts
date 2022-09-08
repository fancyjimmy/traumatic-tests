import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({request, params, locals}) => {
    if(!locals.user){
        throw error(401, "Not logged in");
    }
    if(locals.user.userRole !== "ADMIN"){
        throw error(401, "Unauthorized");
    }
}