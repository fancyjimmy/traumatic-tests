<script lang="ts">
    import {page} from "$app/stores"
    import {goto} from "$app/navigation"; 
  
    let username:string;
    let password:string;

    let error: string;


    function login() {
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            redirect: "follow"
        }).then(res => {
            if(!res.ok){
                if(res.status === 400){
                    throw new Error("Password invalid");
                } else if(res.status === 404){
                    throw new Error("User not found"); 
                }
            }
            if(res.redirected){
                goto(res.url, {replaceState: true});
            }
        }).catch(reason => {
            error = reason;
        });
    }

    
</script>

<div style="display: flex; flex-direction: column; width: 20%">
    <input type="text" bind:value={username}>
    <input type="password" bind:value={password}>
</div>

{#if error}
    <p>{error}</p>
{/if}


<input type="button" on:click={login} value="Login">