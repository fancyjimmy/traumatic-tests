<script lang="ts">
import { invalidate } from "$app/navigation";

  import { base } from "$app/paths";
  import { getSchoolYear } from "$lib/util";

  import type { PageData } from "./$types";

  let selectedRole: number;
  let grade: number;
  let gradeName: string;

  function requestRole() {
    console.log(grade, gradeName, selectedRole);
    fetch(base, {
      method: "POST",
      body: JSON.stringify({
        roleId: selectedRole,
        grade,
        gradeName,
      }),
    }).then((res) => {
      invalidate()
    });
  }

  export let data: PageData;
</script>

{#if !data.roleRequest}
  <div class="select-role">
    <p>Role Beantragen</p>

    <select bind:value={selectedRole}>
      {#each data.roles as role}
        <option value={role.id}>{role.name}</option>
      {/each}
    </select>

    <select bind:value={grade} placeholder="Schulstufe">
      {#each data.grades as num}
        <option value={num}>{num}</option>
      {/each}
    </select>

    <select bind:value={gradeName} placeholder="Klasse">
      {#each data.gradeNames as name}
        <option value={name}>{name}</option>
      {/each}
    </select>


    <input type="button" on:click={requestRole} value="Anfordern" />
  </div>
{:else}
  <div class="role-request">
    <p>{getSchoolYear() - data.roleRequest.gradeYear}</p>
    <p>{data.roleRequest.gradeName}</p>
    <p>{data.roleRequest.role.name}</p>

    <p>
      {data.roleRequest.accepted === null
        ? "Not Fullfilled Yet"
        : data.roleRequest.accepted
        ? "Accepted"
        : "Denied"}
    </p>
  </div>
{/if}
