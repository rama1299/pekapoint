<script>
	import { goto } from '$app/navigation';
</script>

<div class="w-full space-y-10 pb-10 px-5 lg:px-0">
    <div class="w-full text-center space-y-3">
        <p class="text-2xl font-bold">Our Top Product</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nostrum laudantium dicta dignissimos cum velit.</p>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {#each Array(12) as _, i}
            <div class="w-full col-span-1 border-2 rounded-lg p-5">
                <div class="w-full h-full flex md:flex-col justify-between gap-3 cursor-pointer group">
                    <div class="w-full h-32 lg:h-52 flex justify-center">
                        <img src="https://images.versus.io/objects/xiaomi-14.front.medium.1698408371952.jpg" alt="" class="h-full group-hover:scale-105 duration-200">
                    </div>
                    <div class="w-full space-y-3">
                        <div>
                            <p class="w-full text-start font-semibold leading-5 h-10 overflow-hidden group-hover:text-sky-500 duration-100">Xiaomi 14 Pro Max Ultra unlimited Profesional</p>
                        </div>
                        <div class="w-full flex flex-col-reverse gap-1 md:flex-row md:justify-between items-start">
                            <div class="space-y-1 w-full">
                                <div class="flex gap-2 items-center">
                                    <i class='bx bxs-star text-sky-500'></i>
                                    <p class="font-semibold">4.5</p>
                                </div>
                                <div class="flex w-full justify-between items-end">
                                    <div class="leading-3">
                                        <p class="font-medium text-sm">From</p>
                                        <p class="font-semibold text-xl">$ 724</p>
                                    </div>
                                    <button class="w-7 md:w-9 rounded-md bg-sky-500 hover:bg-white aspect-square border border-sky-500 duration-100 text-white hover:text-sky-500 flex items-center justify-center">
                                        <i class='bx bx-right-arrow-alt text-xl' ></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
    <div class="w-full flex justify-center">
        <div class="h-11 w-52 bg-sky-500 hover:bg-white border-2 border-sky-500 text-white hover:text-sky-500 duration-100 rounded-md flex justify-center items-center cursor-pointer" on:click={() => {goto(`/product`)}}>
            <p class="text-lg font-medium">See All</p>
        </div>
    </div>
</div>