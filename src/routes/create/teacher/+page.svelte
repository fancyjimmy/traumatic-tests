<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { PageData } from "../../../.svelte-kit/types/src/routes/teacher/$types";

  let firstname: string;
  let lastname: string;
  let abbreviation: string;

  function submit() {
    let body = JSON.stringify({
      firstname,
      lastname,
      abbreviation,
    });
    console.log(body);
    fetch("/teacher", {
      method: "POST",
      body,
    })
      .then((res) => {
        if (res.status === 201) {
          let teacher = { id: -1, firstname, lastname, abbreviation };
          data.teachers.push(teacher);
          firstname = "";
          lastname = "";
          abbreviation = "";
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  export let data: PageData;
</script>

<ul>
  {#each data.teachers as teacher}
    <li>
      {teacher.firstname ?? ""}
      {teacher.lastname} '{teacher.abbreviation}'
    </li>
  {/each}
</ul>

<input type="text" placeholder="Abkürzung" bind:value={abbreviation} />
<input type="text" placeholder="Vorname" bind:value={firstname} />
<input type="text" placeholder="Nachname" bind:value={lastname} />

<button on:click={submit}>Submit</button>
