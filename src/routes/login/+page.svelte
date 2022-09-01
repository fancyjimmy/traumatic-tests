<script lang="ts">
    import {page} from "$app/stores"
    let username;
    let password;

    function login() {
        fetch("/account/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(user => {
                $page.data.user = user
            });
    }
</script>

<div style="display: flex; flex-direction: column; width: 20%">
    <input type="text" bind:value={username}>
    <input type="password" bind:value={password}>
</div>

<input type="button" on:click={login} value="Login">