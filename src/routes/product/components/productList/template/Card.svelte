<script>
	import { goto } from '$app/navigation';
	import SpecDetail from './SpecDetail.svelte';
    import { onMount } from "svelte";
    import { compareDataStore } from '../../../../../stores'
    import { saveToSessionStorage, getFromSessionStorage} from '../../../../../helpers/sessionStorage'
    import { formatCurrencyIDR } from '../../../../../helpers/currency';
  import ChartDonut from './ChartDonut.svelte';
  import { Translate } from '../../../../../helpers/translate';

    export let data;
    export let tabControl
    export let specs

    let text = ['Add to comparison']

    onMount(async ()=> {
        let translate = await Translate.client(text)
        text = translate
        
        const initialValue = getFromSessionStorage('compareDataSession')

        initialValue ? compareDataStore.set(initialValue) : compareDataStore.set([])

    })

    async function handleCompare(title, slug, feature_image) {
        const data = {title, slug, feature_image}
        try {
            const isDataExists = $compareDataStore.some(existingData => existingData.slug === data.slug);

            if (!isDataExists && $compareDataStore.length < 4) {
                compareDataStore.update(existingData => [...existingData, data])
                saveToSessionStorage('compareDataSession', $compareDataStore)

            } else {
                console.log('Data sudah ada tambahkan');
            }
        } catch (error) {
            console.log(error)
        }
    }


</script>

    <div class="m-auto bg-white pt-3 px-3 w-full relative overflow-hidden">
        <div class="relative w-full">
            <div class="flex w-full justify-center cursor-pointer" on:keypress={() => {() => {goto(`/product/${data.slug}`)}}} on:click={() => {goto(`/product/${data.slug}`)}}>
                <div class="w-1/2 pr-2">
                    {#if data.feature_image.includes('https')}
                        <img src={`${data.feature_image}`} alt="" class="h-24 m-auto cursor-pointer hover:scale-105 duration-200" >
                    {:else}
                        <img src={`/${data.feature_image}`} alt="" class="h-24 m-auto cursor-pointer hover:scale-105 duration-200" >
                    {/if}
                    <div class="h-8 w-8 rounded-full absolute -left-1 -top-1 bg_img">
                        <ChartDonut score={data.spec_score}/>
                        <div class="absolute w-full h-full flex justify-center items-center top-0">
                            <p class="score text-sm font-semibold">{data.spec_score}</p>
                        </div>
                    </div>
                </div>
                <!-- <div class="w-1/2 h-44 overflow-hidden relative">
                    <div class="w-full h-full gradient absolute top-0 left-0"></div>
                    <SpecDetail data={specs} tabControl={tabControl}/>
                </div> -->
            </div>
            <!-- <div class="flex w-full justify-end mt-3 absolute bottom-16">
                <p class="rounded-tl-lg py-1 px-2 font-medium bg-gradient-to-l from-yellow-300 to-orange-500 text-white text-end cursor-pointer hover:scale-105 duration-200">{formatCurrencyIDR(data.launch_price)}</p>
            </div> -->
            <div class="flex w-full h-10 justify-between justify-items-center items-start mt-2 relative overflow-hidden">
                <a href={`/product/${data.slug}`} class="font-semibold cursor-pointer hover:underline underline-offset-1 leading-5 text-sekunder-950 w-5/6 h-full text-sm">{data.title}</a>
                <div class="flex items-center justify-end gap-2 bg-sekunder-950 p-1 group text-white rounded-tl-lg absolute right-0 cursor-pointer">
                    <i class='bx bx-git-compare text-md compare_btn'></i>
                    <p class="font-medium close truncate w-full text-xs" on:keypress={()=> {handleCompare(data.title, data.slug, data.feature_image)}} on:click={()=> {handleCompare(data.title, data.slug, data.feature_image)}}>| {text[0]}</p>
                </div>
            </div>
        </div>
    </div>

    <style>
        .close{
            clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
            position: absolute;
        }
        .group:hover .close{
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transition: 0.3s;
            position: static;
        }
        .compare_btn:hover {
            right: 0;
            transition: 0.3s ease;
        }

        .compare_btn {
            right: -174px;
            transition: 0.3s ease;
        }

        .score {
            bottom: 35px;
            left: 14px;
        }
        .bg_img {
            background: rgb(255, 255, 255, 0.7);
        }

        .gradient {
            background: linear-gradient(to top, rgba(255, 255, 255, 1) 9%, rgba(255, 255, 255, 0) 60%);
            transition: 1s ease-in-out;
        }
    </style>