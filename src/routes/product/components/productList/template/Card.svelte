<script>
	import { goto } from '$app/navigation';
	import SpecDetail from './SpecDetail.svelte';
    import { onMount } from "svelte";
    import { compareDataStore } from '../../../../../stores'
    import { saveToSessionStorage, getFromSessionStorage} from '../../../../../helpers/sessionStorage'
    import { formatCurrencyIDR } from '../../../../../helpers/currency';
  import ChartDonut from './ChartDonut.svelte';

    export let data;
    export let tabControl
    export let specs

    onMount(()=> {
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

    <div class="m-auto bg-white px-4 pt-6 w-full relative h-[315px] overflow-hidden ">
        <div class="relative w-full h-[290px]">
            <div class="flex w-full justify-center cursor-pointer" on:keypress={() => {() => {goto(`/product/${data.slug}`)}}} on:click={() => {goto(`/product/${data.slug}`)}}>
                <div class="w-1/2 pr-2">
                    <img src={data.feature_image} alt="" class="h-56 m-auto cursor-pointer hover:scale-105 duration-200" >
                    <div class="h-12 w-12 rounded-full absolute left-0 -top-2 bg_img">
                        <ChartDonut score={data.spec_score}/>
                        <div class="absolute w-full h-full flex justify-center items-center top-0">
                            <p class="score font-semibold">{data.spec_score}</p>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 h-56 overflow-hidden relative">
                    <div class="w-full h-full gradient absolute top-0 left-0"></div>
                    <SpecDetail data={specs} tabControl={tabControl}/>
                </div>
            </div>
            <div class="flex w-full justify-end mt-3 absolute bottom-16">
                <p class="rounded-tl-lg py-1 px-2 font-medium bg-gradient-to-l from-yellow-300 to-orange-500 text-white text-end cursor-pointer hover:scale-105 duration-200">{formatCurrencyIDR(data.launch_price)}</p>
            </div>
            <div class="flex justify-between justify-items-center items-start mt-2 relative overflow-hidden">
                <p class="text-xl font-semibold cursor-pointer hover:underline underline-offset-1" on:keypress={() => {goto(`/product/${data.slug}`)}}  on:click={() => {goto(`/product/${data.slug}`)}}>{data.title}</p>
                <div class="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-800 px-2 text-white rounded-tl-lg absolute cursor-pointer compare_btn">
                    <i class='bx bx-git-compare text-xl compare_btn'></i>
                    <p class="font-medium" on:keypress={()=> {handleCompare(data.title, data.slug, data.feature_image)}} on:click={()=> {handleCompare(data.title, data.slug, data.feature_image)}}>| Add to comparison</p>
                </div>
            </div>
        </div>
    </div>

    <style>
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