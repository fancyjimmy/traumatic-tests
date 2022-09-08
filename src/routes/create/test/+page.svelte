<script lang="ts">
  import type { PageData } from "./$types";

  import { redirect } from "@sveltejs/kit";

  let images: string[] = [];
  $: imageData = images.map((value) => value.split(",")[1]);
  let files: FileList;

  async function getBase64FromFile(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        if (ev.target) {
          resolve(ev.target.result as string);
        } else {
          reject(ev);
        }
      };
      reader.onerror = (ev) => reject(ev);
    });
  }

  async function getImageData(file: Blob): Promise<string> {
    let imgData = await getBase64FromFile(file);
    return imgData.split(",")[1];
  }

  async function getImages(file: Blob[]): Promise<string[]> {
    return Promise.all(file.map((blob) => getBase64FromFile(blob)));
  }

  async function fileUpload() {
    let fileList = [];
    for (let i = 0; i < files.length; i++) {
      fileList[i] = files[i];
    }
    let loaded = [...new Set(await getImages(fileList))];
    images = loaded;
  }

  async function uploadFunction(imgBase64: string) {
    const formData = new FormData();
    const imgData = imgBase64.split(",");
    formData.append("image", imgData[1]);
    formData.append("name", data.name);
    const request = new XMLHttpRequest();
    request.open("POST", "/test/" + data.name);
    request.send(formData);
  }

  export let data: PageData;
</script>

<div class="container">
  <div class="test-images">
    {#if images}
      {#each images as image}
        <img src={image} alt="test image" />
      {/each}
    {/if}
  </div>

  <div class="questions">
    <select>
      {#each data.subjects as subject}
        <option value={subject.id}>{subject.name}</option>
      {/each}
    </select>
    <select>
      {#each data.teachers as teacher}
        <option value={teacher.id}>{teacher.abbreviation}</option>
      {/each}
    </select>
    <input type="number" placeholder="Nummer"/>
    <input type="number" placeholder="Jahr" />
  </div>
  <input
    class="hidden"
    id="file-to-upload"
    type="file"
    accept=".png,.jpg"
    multiple
    bind:files
    on:change={fileUpload}
  />

  <button class="upload-btn" on:click={() => uploadFunction(avatar)}
    >Upload</button
  >
</div>

<style>
  .test-images {
    display: flex;
    flex-direction: row;
    height: 30vh;
    width: 100vw;
    overflow-x: scroll;
  }

  .questions {
    display: flex;
    flex-direction: column;
    width: 20vw;
  }

  .test-images > img {
    height: 100%;
    width: auto;
  }
</style>
