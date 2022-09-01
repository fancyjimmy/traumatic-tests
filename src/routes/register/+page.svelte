<script lang="ts">
    import {matchesPasswordStandard} from "../../lib/util";

    let username;
    let password;
    let passwordCopy;

    let passwordValid = true;
    let passwordMatch = true;

    function register() {
        if (!matchesPasswordStandard(password)){
            passwordValid = false
            return
        } else {
            passwordValid = true
        }

        if (password !== passwordCopy){
            passwordMatch = false
            return;
        } else {
            passwordMatch = true
        }

        fetch("/account/register", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => res.json())
            .then(res => console.log(res));
    }
</script>


<div style="display: flex; flex-direction: column; width: 20%">
    <input type="text" bind:value={username}>
    <input type="password" bind:value={password}>
    <input type="password" bind:value={passwordCopy}>

</div>

{#if !passwordValid}
    <p>Passwort muss aus 8 Charackteren/Nummern bestehen</p>
{/if}
{#if !passwordMatch}
    <p>Passwörter müssen gleich sein</p>
{/if}


<input type="button" on:click={register} value="Registrieren">