<script lang="ts">
import { goto } from "$app/navigation";

  import { matchesPasswordStandard } from "$lib/util";
import type { PageData } from "./$types";
  let username: string;
  let password: string;
  let passwordCopy: string;

  let passwordValid = true;
  let passwordMatch = true;
  let error: string;

  function register() {
    if (!matchesPasswordStandard(password)) {
      passwordValid = false;
      return;
    } else {
      passwordValid = true;
    }

    if (password !== passwordCopy) {
      passwordMatch = false;
      return;
    } else {
      passwordMatch = true;
    }

    fetch("/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      }),
    })
      .then((res) => {
          if(res.status === 455){
              throw new Error("Username and Password can't be empty")
          } else if(res.status === 456){
              throw new Error("Password doesn't meet requirements")
          } else if(res.status === 409){
              throw new Error("Username is already used")
          }
        if (res.redirected) {
            goto(res.url, {replaceState: true});
        }
      })
      .catch((reason) => {
          error = reason
      });
  }

  export let data: PageData;
</script>

<div style="display: flex; flex-direction: column; width: 20%">
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Passwort"/>
  <input type="password" bind:value={passwordCopy} placeholder="Passwort Wiederholung" />
</div>

{#if error}
  <p>{error}</p>
{/if}

{#if !passwordValid}
  <p>Passwort muss aus 8 Charackteren/Nummern bestehen</p>
{/if}
{#if !passwordMatch}
  <p>Passwörter müssen gleich sein</p>
{/if}

<input type="button" on:click={register} value="Registrieren" />
