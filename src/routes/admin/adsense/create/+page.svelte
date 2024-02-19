<script>
	import { goto } from '$app/navigation';
    import { onDestroy, onMount } from 'svelte';
    import Dashboard from "../../components/Dashboard.svelte";
    import loader from '@monaco-editor/loader';

    let page = ['/', '/product', '/product/slug', '/compare', '/compare/slug', '/blog', '/blog/slug']
    let position = ['top', 'left', 'right', 'center', 'bottom']
    let editor;
    let monaco;
    let editorContainer;

    onMount(async () => {
        // Remove the next two lines to load the monaco editor from a CDN
        // see https://www.npmjs.com/package/@monaco-editor/loader#config
        const monacoEditor = await import('monaco-editor');
        loader.config({ monaco: monacoEditor.default });

        monaco = await loader.init();

        // Your monaco instance is ready, let's display some code!
        editor = monaco.editor.create(editorContainer, {
            minimap: {enabled: false},
            language: 'html',
            theme: "vs-dark",
            automaticLayout: true,
        });
        const model = monaco.editor.createModel(
`<p style="font-size: 30px;" class="bg-gray-200">Hello World</p>`,
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

    function handleSubmit() {
        valueEditor = editor.getValue()

        console.log({
            valueTitle,
            valuePage,
            valuePosition,
            valueEditor
        })
    }

</script>

<Dashboard>
    <div class="w-full h-full">
        <div class="w-full h-1/6 px-5 pt-5 flex flex-col justify-start gap-3 border-b-2">
            <div>
                <p class="text-2xl font-bold">Form Adsense</p>
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
                    <button class="px-2 py-1 lg:px-3 lg:py-2 rounded-md bg-sky-950 border-2 border-sky-950 text-sm text-white font-semibold hover:bg-white hover:text-sky-950 duration-100" on:click={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
        <div class="w-full h-5/6 bg-gray-100 flex overflow-scroll divide-x-2">
            <div class="w-full lg:w-1/2 h-full p-5 font-semibold space-y-5">
                    <div class="flex flex-col">
                        <label for="title">Title</label>
                        <input type="text" id="title" class="rounded-md" bind:value={valueTitle}>
                    </div>
                    <div class="flex flex-col">
                        <label for="page">Page</label>
                        <select name="" id="" class="rounded-md" bind:value={valuePage}>
                            {#each page as item}
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