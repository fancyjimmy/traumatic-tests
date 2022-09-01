<script>
    let fileInput;
    let files;
    let avatar;

    export let data;

    function getBase64(image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result;
        };
    };

    async function uploadFunction(imgBase64) {
        const formData = new FormData()
        const imgData = imgBase64.split(',');
        formData.append("image", imgData[1]);
        formData.append("name", data.name);
        const request = new XMLHttpRequest();
        request.open("POST", "/test/"+data.name);
        request.send(formData);
    };
</script>

<div class="container">
    {#if avatar}
        <img src={avatar} alt="avatar"/>
    {:else}
        <img src="avatar.png" alt="avatar"/>
    {/if}
    <input class="hidden" id="file-to-upload" type="file" accept=".png,.jpg" bind:files bind:this={fileInput}
           on:change={() => getBase64(files[0])}/>
    <button class="upload-btn" on:click={ () => uploadFunction(avatar) }>Upload</button>
</div>