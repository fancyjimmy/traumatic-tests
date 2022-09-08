import { error, redirect } from '@sveltejs/kit';
export function isEmpty(text: string): boolean {
    return !text || text.trim().length === 0;
}

export function matchesPasswordStandard(password: string): boolean {
    /*
    if (password.length < 8) return false
    if (password.search(/\d/) == -1) return false  // contains num
    if (password.search(/[a-z]/) == -1) return false  // contains lower chars
    if (password.search(/[A-Z]/) == -1) return false
    */
    return true
}

export function requireRoleOrError(user: User, role: string, status: number, message: string) {
    if (user.userRole?.name === role){
        throw error(status, message);
    }
}

export function requireRoleOrRedirect(user: User, role:string, status: number, location: string){
    if (user.userRole?.name === role){
        throw redirect(status, location);
    }
}

export function requireUserOrRedirect(user: User | null, status: number, location: string){
    if(!user){
        throw redirect(status, location);
    }
}

export function getSchoolYear(){
    // 8 because September is 8 because January -> 0
    return new Date().getFullYear() + ((new Date().getMonth() < 8) ? 0 : 1)
}
export function getSchoolStartYear(grade: number){
    let schoolYear = getSchoolYear()
    return schoolYear - grade
}