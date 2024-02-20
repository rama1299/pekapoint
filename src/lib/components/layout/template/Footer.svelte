<script>
  import { onMount } from "svelte";
    import { Translate } from "../../../../helpers/translate";
    onMount(async () => {
        let translate = await Translate.client(text)
        text = translate
    })
    let text = ['home', 'product', 'compare', 'blog', 'about us', 'office', 'link']
    const brand = import.meta.env.VITE_BRAND
</script>

<footer class="w-full bg-[#0a1831] text-white flex justify-center items-center px-5 py-10">
    <div class="w-full lg:w-[90%] grid lg:grid-cols-6 grid-cols-1 md:grid-cols-2 gap-7">
        <div class="w-full col-span-1 lg:col-span-2 space-y-5">
            <div>
                <p class="text-3xl lg:text-4xl font-bold italic">{brand}</p>
            </div>
            <div class="w-full h-full">
                <p class="w-full h-full text-md leading-6 font-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
        <div class="w-full col-span-1 space-y-5">
            <div class="w-full flex justify-start">
                <p class="text-xl font-medium border-b-2 flex justify-start">{text[5]}</p>
            </div>
            <div class="w-full">
                <p class="text-md leading-6 font-light">Sukawati</p>
                <p class="text-md leading-6 font-light">Kab. Gianyar</p>
                <p class="text-md leading-6 font-light">Bali, Indonesia</p>
            </div>
        </div>
        <div class="w-full col-span-1 space-y-5">
            <div class="w-full flex justify-start">
                <p class="text-xl font-medium border-b-2 flex justify-start">{text[6]}</p>
            </div>
            <div class="text-md font-light flex flex-col gap-2 capitalize">
                <a href="/">{text[0]}</a>
                <a href="/product">{text[1]}</a>
                <a href="/compare">{text[2]}</a>
                <a href="/blog">{text[3]}</a>
                <a href="/about">{text[4]}</a>
            </div>
        </div>
        <div class="w-full col-span-1 lg:col-span-2 space-y-5">
            <div class="w-full flex justify-start">
                <p class="text-xl font-medium border-b-2 flex justify-start">Media</p>
            </div>
            <div class="w-full flex justify-start gap-2 text-4xl">
                <i class='bx bxl-facebook-circle'></i>
                <i class='bx bxl-instagram-alt' ></i>
                <i class='bx bxl-twitter' ></i>
                <i class='bx bxl-whatsapp-square' ></i>
            </div>
        </div>
    </div>
</footer>
