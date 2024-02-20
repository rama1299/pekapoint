<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
  import { Translate } from '../../../../helpers/translate';

  let text = ['Viewed', 'New']

    onMount(async ()=> {
        let translate = await Translate.client(text, true)
        text = translate

        if ($page.url.searchParams.get('filter') == 'new') {
            filter = text[1]
        } else {
            filter = text[0]
        }

        document.addEventListener('click', handleOutSide);
        
        return () => {
            document.removeEventListener('click', handleOutSide);
        };
    })

    $: filter = ''
    let dropdownFilter = false

    function handleFilter(type) {
        dropdownFilter = false

        if (type == 'New') {
            filter = text[1]
        } else {
            filter = text[0]
        }

        goto(`/compare?filter=${type.toLowerCase().replace(/\s/g, '_')}`)

    }

    function handleOutSide(event) {
        const dropDown = document.getElementById('dropDown')

        if (dropDown && !dropDown.contains(event.target)) {
            dropdownFilter = false
        }
    }

</script>

<div class=" w-full mx-auto h-12">
    <div class="h-full flex justify-start gap-5 items-center ">
        <div class="font-semibold text-xl">
            <p>Filter</p>
        </div>
        <div id="dropDown" class="relative h-full">
            <div class=" flex justify-between items-center h-full w-40 bg-white rounded-md px-2 border cursor-pointer" on:click={()=> {dropdownFilter = !dropdownFilter}}>
                <p class="font-medium">{filter}</p>
                <i class='bx bx-chevron-down text-xl'></i>
            </div>
            <div class=" {dropdownFilter ? '' : 'hidden'} absolute w-34 bg-white rounded-md border shadow-lg p-3 top-12 right-0">
                <div class="w-full text-end space-y-1 font-medium">
                    <p class="w-full hover:text-sky-500 cursor-pointer" on:click={()=> {handleFilter('Most Viewed')}}>{text[0]}</p>
                    <p class="w-full hover:text-sky-500 cursor-pointer" on:click={()=> {handleFilter('New')}}>{text[1]}</p>
                </div>
            </div>
        </div>
    </div>
</div>