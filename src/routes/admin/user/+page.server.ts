import { db } from '$lib/database';
import type { PageServerLoad, Action } from "./$types";
import {main }from "$lib/init"

export const load: PageServerLoad = async ({request, params, locals}) => {

    let users = await db.user.findMany({
        include: {
            userRole: {
                include: {
                    role: true
                }
            }
        }
    })

    let people = users.map(value => {return {
        username : value.username,
        userRole: value.userRole,
        updatedAt: value.updatedAt,
        createdAt: value.createdAt,
        id: value.id
    }});

  
    
    let roles = await db.role.findMany({
    }); 



    return {
        user: locals.user,
        users: people,
        roles
    }
}

export const PUT: Action =async ({request, locals}) => {
    const data = await request.json();
    let {userId, roleId} = data; 
    if(!(userId || roleId) || isNaN(roleId)){
        return {
            status: 400,
            errors: {reason: "Not Valid"}
        }
    }

    roleId = Number.parseInt(roleId);

    //
    if(roleId === -1){
        roleId = null;
        await db.userRole.delete({
            where: {
                userId: userId
            }
        }).catch();
        return {
            status: 200
        }
    } 

    console.log(userId, roleId);
    await db.userRole.upsert({
        where: {
            userId: userId
        }, 
        update: {
            roleId: roleId,
            roleGiverId: locals.user?.userId
        }, 
        create: {
            userId: userId,
            roleId: roleId,
            roleGiverId: locals.user?.userId
        }
    })

    return {
        status: 200
    }
}