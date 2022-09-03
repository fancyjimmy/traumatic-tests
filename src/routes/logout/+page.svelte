<script lang="ts">
  import { goto } from "$app/navigation";

  import { getStores } from "$app/stores";

  function logout() {
    fetch("/logout", {
      method: "POST",
      redirect: "follow"
    }).then((res) => {
      if (res.redirected) {
        goto(res.url, { replaceState: true });
      }
    });
  }

  export let data: { user: any };
</script>

{#if data.user}
  <p>{data.user.username}</p>
  <p>{data.user.session}</p>
{/if}

<button on:click={logout}>Logout</button>
