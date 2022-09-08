// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
type Role = {
    name: string,
    grade: {
        name: string,
        year: number
    }
}

type User = {
    userId: string,
    username: string,
    session: string | null,
    userRole: Role | null
}

declare namespace App {
	interface Locals {
        user: User | null
    }

	interface PageData {
        user: User
    }
	// interface Platform {}
}
