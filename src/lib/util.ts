export function isEmpty(text: string) : boolean{
    return !text || text.trim().length === 0;
}

export function matchesPasswordStandard(password: string): boolean{
    if (password.length < 8) return false
    if (password.search(/\d/) == -1) return false  // contains num
    if (password.search(/[a-z]/) == -1) return false  // contains lower chars
    if (password.search(/[A-Z]/) == -1) return false
    return true
}