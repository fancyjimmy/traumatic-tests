<script lang="ts">
    import {invalidate} from '$app/navigation'
import type { PageData } from './$types';

    let subjectName:string;
    let subjectAbbreviation:string;

    function submit() {

        let body = JSON.stringify({
            name: subjectName,
            abbreviation: subjectAbbreviation
        })
        console.log(body)
        fetch("/subject", {
            method: "POST",
            body
        })
            .then(res => {
                    if (res.status === 201) {
                        data.subjects.push({id: -1, name: subjectName, abbreviation: subjectAbbreviation})
                        subjectName = ""
                        subjectAbbreviation = ""
                    }
                }
            ).catch(reason => {
                console.log(reason)
        })

    }



    export let data: PageData;

</script>

<ul>
    {#each data.subjects as subj}
        <li>{subj.name}</li>
    {/each}
</ul>

<input type="text" placeholder="Abkürzung" bind:value={subjectAbbreviation}>
<input type="text" placeholder="Name" bind:value={subjectName}>
<button on:click={submit}>Submit</button>