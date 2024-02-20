<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import Dashboard from "../../components/Dashboard.svelte";
    import loader from '@monaco-editor/loader';
    import { FetchAds } from '../../../../modules/fetchAdsManagement';

    let pages = ['home', 'product', 'product-slug', 'compare', 'compare-slug', 'blog', 'blog-slug']
    let position = ['top', 'left', 'right', 'center', 'bottom']
    let editor;
    let monaco;
    let editorContainer;

    let data;

    onMount(async () => {

        const id = $page.url.pathname.replace('/admin/adsense/', '')

        const dataAds = await FetchAds.getAdsById(id)

        if (dataAds.status == 200) {
            data = dataAds.data[0]

            valueTitle = data.title
            valuePage = data.page
            valuePosition = data.content_position
        } else {
            goto('/error')
        }

        const monacoEditor = await import('monaco-editor');
        loader.config({ monaco: monacoEditor.default });

        monaco = await loader.init();

        editor = monaco.editor.create(editorContainer, {
            minimap: {enabled: false},
            language: 'html',
            theme: "vs-dark",
            automaticLayout: true,
        });
        const model = monaco.editor.createModel(
data.content,
            'html'
        );
        editor.setModel(model);
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
    });

    $: valueEditor = ''
    let valueTitle = ''
    let valuePage = ''
    let valuePosition

    function handleRun() {
        valueEditor = editor.getValue()
    }

    async function handleSubmit() {
        try {
            valueEditor = editor.getValue()

        if (!valueTitle || !valuePage || !valuePosition || !valueEditor) {
            alert('Data tidak lengkap!')
            return
        }

        let dataNew = {
            title: valueTitle,
            page: valuePage,
            content_position: valuePosition,
            content: valueEditor
        }

        let result = await confirm('Simpan data Adsense terbaru?')

        if (result) {
            const response = await FetchAds.updateAds(dataNew, data.id)

            if (response.status == 200) {
                window.location.reload()
            } else {
                alert(response.data.message)
            }
        }

        } catch (error) {
            alert('Create Adsense failed!')
        }
    }

    async function handleDelete() {
        try {
            let result = await confirm('Delete data Adsense?')
            let id = data.id

            if(result) {
                const response = await FetchAds.deleteAds(id)

                if (response.status == 200) {
                    goto(`/admin/adsense`)
                } else {
                    alert(response.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            // alert('Delete failed!')
        }
    }

</script>

<Dashboard>
    <div class="w-full h-full">
        <div class="w-full h-2/6 px-5 pt-5 flex flex-col justify-start gap-3 border-b-2 overflow-hidden">
            <div>
                <p class="text-2xl font-bold">Detail Adsense</p>
            </div>
            <div class="w-full flex justify-between">
                <div>
                    <div class="flex items-center justify-center gap-3" on:click={() => {window.history.back()}}>
                        <div class="w-8 lg:w-12 aspect-square flex justify-center items-center rounded-full border-2 border-sky-950 hover:bg-white bg-sky-950 cursor-pointer group duration-100">
                            <i class='bx bx-left-arrow-alt text-xl lg:text-3xl group-hover:text-sky-950 text-white'></i>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="px-2 py-1 lg:px-3 lg:py-2 rounded-md bg-red-600 border-2 border-red-600 text-sm text-white font-semibold hover:bg-white hover:text-red-600 duration-100" on:click={handleDelete}>Delete</button>
                    <button class="px-2 py-1 lg:px-3 lg:py-2 rounded-md bg-sky-950 border-2 border-sky-950 text-sm text-white font-semibold hover:bg-white hover:text-sky-950 duration-100" on:click={handleSubmit}>Save</button>
                </div>
            </div>
            <div class="w-full h-40 overflow-auto">
                {#if data}
                     <div class="font-medium">
                         <p>ID : {data.id}</p>
                         <p>Title : {data.title}</p>
                         <p>Page : {data.page}</p>
                         <p>Position : {data.content_position}</p>
                         <p>Content : {data.content}</p>
                     </div>
                {/if}
            </div>
        </div>
        <div class="w-full h-4/6 bg-gray-100 flex overflow-scroll divide-x-2">
            <div class="w-full lg:w-1/2 h-full p-5 font-semibold space-y-5">
                    <div class="flex flex-col">
                        <label for="title">Title</label>
                        <input type="text" id="title" class="rounded-md" bind:value={valueTitle}>
                    </div>
                    <div class="flex flex-col">
                        <label for="page">Page</label>
                        <select name="" id="" class="rounded-md" bind:value={valuePage}>
                            {#each pages as item}
                                <option value={item}>{item}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="title">Position</label>
                        <select name="" id="" class="rounded-md capitalize" bind:value={valuePosition}>
                            {#each position as item}
                                 <option value={item} class="capitalize">{item}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="flex flex-col gap-1">
                            <div class="w-full flex justify-between items-end">
                                <p>Content</p>
                                <button class="w-14 h-8 rounded-md bg-black font-medium border border-black text-white hover:bg-white hover:text-black duration-100" on:click={handleRun}>Run</button>
                            </div>
                        <div class=" w-full h-52 lg:h-64">
                            <div class="w-full h-full flex flex-col gap-2">
                                <div bind:this={editorContainer} id='editorContainer' class="rounded-md border border-black"></div>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="w-1/2 h-full hidden lg:flex bg-white p-5">
                <div class="w-full h-full">
                    {@html valueEditor}
                </div>
            </div>
        </div>
    </div>
</Dashboard>

<style>
    #editorContainer {
        width: 100%;
        height: 100%;
    }
</style>