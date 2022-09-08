<script lang="ts">
  import { goto } from "$app/navigation";

  import { identity } from "svelte/internal";

  import type { PageData } from "./$types";
  export let data: PageData;

  function changeRole(userId: string, roleId: number) {
    fetch("/admin/user", {
      method: "PUT",
      body: JSON.stringify({ userId, roleId }),
    }).then((res) => {
      if (res.redirected) {
        goto(res.url, { replaceState: true });
      }
    });
  }
</script>

{#each data.roles as role}
  <p>{role.name}</p>
{/each}

{#if data.users}
  {#each data.users as user}
    <div class="user">
      <p>
        {user.username}
      </p>


      <select
        on:change={(event) => changeRole(user.id, event.target.value)}
      >
        {#each [...data.roles, { id: -1, name: "No Role" }] as role}
          <option
            selected={user.userRole === null ||
              role.id === user.userRole?.roleId}
            value={role.id}>{role.name}</option
          >
        {/each}
      </select>
      <p>
        {user.createdAt}
      </p>
    </div>
  {/each}
{/if}

<style>
  .user {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
  }
</style>
