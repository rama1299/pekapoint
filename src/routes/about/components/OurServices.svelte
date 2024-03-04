<script>
let contents = [
    {
        title: 'Perbandingan Produk yang Mudah',
        content: 'PekaPoint membantu Anda membuat keputusan pembelian yang tepat dengan fitur perbandingan produk kami. Bandingkan harga, spesifikasi, dan fitur produk dari berbagai e-commerce untuk memastikan Anda mendapatkan yang terbaik.',
        active: false
    },
    {
        title: 'Informasi Detail untuk Keputusan yang Tepat',
        content: 'Kami memberikan informasi detail mengenai setiap produk, mulai dari spesifikasi teknis hingga ulasan pengguna. Dengan PekaPoint, Anda dapat membuat keputusan yang terinformasi dan sesuai dengan kebutuhan Anda.',
        active: false
    },
    {
        title: 'Penilaian Objektif Produk',
        content: 'Kami memberikan penilaian objektif untuk setiap produk yang membantu Anda langsung menyimpulkan kualitas dan keunggulan produk tersebut. Kami mengutamakan transparansi dan memberikan pandangan yang jujur mengenai produk.',
        active: false
    },
    {
        title: 'Harga Terbaik dari Berbagai Sumber',
        content: 'PekaPoint mengumpulkan harga terbaik dari e-commerce terpercaya. Dengan kami, Anda tidak hanya mendapatkan produk berkualitas tinggi, tetapi juga harga yang kompetitif.',
        active: false
    },
    {
        title: 'Komunitas Pengguna Aktif',
        content: 'Bergabunglah dengan komunitas pengguna PekaPoint untuk berbagi pengalaman, rekomendasi, dan tips belanja. Kami percaya bahwa kolaborasi pengguna dapat membantu setiap orang membuat keputusan belanja yang lebih baik.',
        active: false
    }
]

function handleActive(i) {
    contents = contents.map((item, index) => {
        if (i == index) {
            return {...item, active: item.active = !item.active}
        }
        return {
            ...item,
            active: false
        }
    })
}
</script>

<div class="w-full">
    <div class="w-full space-y-5 text-sekunder-950">
        <div class="w-full flex justify-between items-end border-b border-sekunder-200 pb-1">
            <p class="font-semibold lg:text-xl bg-primary-500 pl-5 pr-10 py-1 relative -bottom-1 tag">Our Services</p>
        </div>
        <div class="w-full space-y-2">
            {#each contents as item, i}
            <div class="w-full space-y-2 py-2 border-sekunder-950 border-b">
                     <div class="w-full flex justify-between cursor-pointer" on:click={() => {handleActive(i)}}>
                         <p class="lg:text-lg font-medium">{item.title}</p>
                         <div class="flex justify-center items-center">
                             <i class='bx {item.active ? 'bx-minus' : 'bx-plus'} text-xl lg:text-2xl'></i>
                         </div>
                     </div>
                     {#if item.active}
                         <div class="w-full">
                             <p class="text-sm lg:text-base">{item.content}</p>
                         </div>            
                     {/if}
                </div>
            {/each}
        </div>
    </div>
</div>