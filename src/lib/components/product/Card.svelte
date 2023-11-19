<script>
	import SpecDetail from './SpecDetail.svelte';
    import { onMount } from "svelte";
    import { compareDataStore } from '../../stores'
    import { saveToSessionStorage, getFromSessionStorage} from '../../storageHelper'
    export let data;
    export let tabControl

    onMount(()=> {
        const initialValue = getFromSessionStorage('compareDataSession')

        initialValue ? compareDataStore.set(initialValue) : compareDataStore.set([])
    })

    let priceIdr = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            }).format(data.price);
    $: priceIdr = priceIdr.slice(0, -3)


    async function handleCompare(data) {
        try {
            const isDataExists = $compareDataStore.some(existingData => existingData.id === data.id);

            if (!isDataExists && $compareDataStore.length < 3) {
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

    <div class="m-auto bg-white px-4 pt-6 w-full relative h-[360px]">
        <div class="flex w-full justify-center cursor-pointer">
            <div class="w-1/2 pr-2">
                <img src={data.image_url} alt="" class="h-56 m-auto cursor-pointer hover:scale-105 duration-200">
                <div class="h-12 w-12 rounded-full absolute top-4 left-4 bg_img">
                    <slot/>
                    <p class="relative score font-semibold">{data.rank}</p>
                </div>
            </div>
            <div class="w-1/2 h-56 overflow-hidden relative">
                <div class="w-full h-full gradient absolute top-0 left-0"></div>
                <SpecDetail data={data.Specs} tabControl={tabControl}/>
            </div>
        </div>
        <div class="flex w-full justify-end mt-3">
            <p class="rounded-tl-lg py-1 px-2 font-medium bg-gradient-to-l from-yellow-300 to-orange-500 text-white text-end cursor-pointer hover:scale-105 duration-200">{priceIdr}</p>
        </div>
        <div class="flex justify-between justify-items-center items-start mt-2 relative overflow-hidden">
            <p class="text-xl font-semibold cursor-pointer hover:underline underline-offset-1">{data.title}</p>
            <div class="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-800 px-2 text-white rounded-tl-lg absolute cursor-pointer compare_btn">
                <i class='bx bx-git-compare text-xl compare_btn'></i>
                <p class="font-medium" on:click={()=> {handleCompare(data)}}>| Add to comparison</p>
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