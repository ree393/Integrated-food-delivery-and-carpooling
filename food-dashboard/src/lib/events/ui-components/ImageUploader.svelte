<script lang="ts">
    export let imageUrl: any = null;
    let loading: boolean = false;
    let localImageUrl: string | ArrayBuffer | null = null;
</script>

<div class="relative z-0 w-full mb-5 group">
    <input
        type="file"
        accept="image/*"
        id="image"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-gray-900 peer"
        placeholder=" "
        on:change={async (e) => {
            //@ts-ignore
            var file = e.target.files[0];
            imageUrl = file;
            var reader = new FileReader();
            reader.onload = function () {
                let dataURL = reader.result;
                if (dataURL !== null) {
                    localImageUrl = dataURL;
                }
            };

            reader.readAsDataURL(file);
        }}
    />
    <label
        for="image"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-bborder-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Image</label
    >
</div>

<div class="px-25 browser-states">
    <div class="px-0 mt-4">
        {#if loading}
            Loading..
        {:else if localImageUrl}
            <div
                class="upload-product-media d-flex justify-content-between align-items-center mt-25"
            >
                <div class="upload-media-area d-flex">
                    <img
                        class="w-h-6 shadow-md"
                        style="object-fit: contain; background: #f5f5f5"
                        src="{localImageUrl} "
                        alt=""
                    />
                </div>
            </div>
        {:else if imageUrl}
            <div
                class="upload-product-media d-flex justify-content-between align-items-center mt-25"
            >
                <div class="upload-media-area d-flex">
                    <img
                        class="w-h-6 shadow-md"
                        style="object-fit: cover; background: #f5f5f5"
                        src="{imageUrl} "
                        alt=""
                    />
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .w-h-6 {
        width: 6rem;
        height: 6rem;
    }
    .height-auto {
        height: auto !important;
    }
</style>
