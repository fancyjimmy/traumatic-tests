import { db } from '$lib/database';

export async function main() {
    return await initializeRoles()
}

async function initializeRoles() {
    let roles = ["ADMIN", "STUDENT", "MAINTAINER"]
    return Promise.all(roles.map((role) => {
        return db.role.create({
            data: {
                name: role
            }
        })
    }));
}
