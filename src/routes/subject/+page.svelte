<script lang="ts">
    import type {PageData} from "./$types"
    

    export let data: PageData;

</script>

<ul>
    {#each data.subjects as subj}
        <li>{subj.name}</li>
    {/each}
</ul>
