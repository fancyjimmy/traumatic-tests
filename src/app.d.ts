// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
type User = {
    userId: string,
    username: string,
    session: string | null,
    userRole: string | null
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
