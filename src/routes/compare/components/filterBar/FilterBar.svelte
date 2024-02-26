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

<div class="w-full mx-auto">
    <div class="w-full h-10 flex justify-start gap-5 items-center bg-white border border-sekunder-300 rounded-md">
        <div id="dropDown" class="relative h-full w-full">
            <div class=" flex justify-between items-center h-full w-full bg-white rounded-md px-2 cursor-pointer" on:click={()=> {dropdownFilter = !dropdownFilter}}>
                <p class="font-medium">{filter}</p>
                <i class='bx bx-chevron-down text-xl'></i>
            </div>
            <div class=" {dropdownFilter ? '' : 'hidden'} absolute w-full bg-white rounded-md border border-sekunder-300 shadow-lg top-10 right-0">
                <div class="w-full text-end space-y-1 font-medium">
                    <p class="w-full hover:bg-sekunder-50 cursor-pointer px-2 py-1" on:click={()=> {handleFilter('Most Viewed')}}>{text[0]}</p>
                    <p class="w-full hover:bg-sekunder-50 cursor-pointer px-2 py-1" on:click={()=> {handleFilter('New')}}>{text[1]}</p>
                </div>
            </div>
        </div>
    </div>
</div>