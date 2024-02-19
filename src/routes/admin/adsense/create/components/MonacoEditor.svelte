<!-- <script>
    import loader from '@monaco-editor/loader';
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte'
    
    const dispatch = createEventDispatcher();

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

    function handleRun() {
        let valueEditor = editor.getValue()
        dispatch('message', {value: valueEditor})
    }
</script>

<style>
    #editorContainer {
        width: 100%;
        height: 100%;
    }
</style>

<div class="w-full h-full flex flex-col gap-2">
    <div bind:this={editorContainer} id='editorContainer' class="rounded-md border border-black"></div>
    <button class="w-14 h-8 rounded-md bg-black font-medium border border-black text-white hover:bg-white hover:text-black duration-100" on:click={handleRun}>Run</button>
</div> -->
