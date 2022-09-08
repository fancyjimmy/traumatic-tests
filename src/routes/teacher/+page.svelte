<script lang="ts">
  import type { PageData } from "../../../.svelte-kit/types/src/routes/teacher/$types";

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