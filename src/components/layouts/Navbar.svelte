<script>
  let bgClass = "";
  let y = 0

  function handleScroll() {
    if (y > 5) {
      bgClass = "bg-black";
    } else {
      bgClass = "bg-transparent";
    }
    console.log(bgClass, y)
  }

</script>

<svelte:window bind:scrollY={y} on:scroll={handleScroll}/>

<nav class="w-screen text-white fixed {bgClass}">
    <div class="flex h-16 md:justify-between lg:w-2/3 w-11/12 m-auto items-center relative md:static">
        <h1 class="text-2xl font-bold m-auto md:m-0">Comparify</h1>
        <div class="flex gap-3 lg:gap-5">
            <ul class="lg:flex gap-3 lg:gap-5 items-center hidden">
                <li><a href="/">Home</a></li>
                <li><a href="/product">Product</a></li>
                <li><a href="#">About</a></li>
                <li><a href="">Category</a></li>
            </ul>
            <input type="text" placeholder="Search" class="h-7 w-full rounded-full border-none text-black px-4 py-2 hidden md:block">
        </div>
        <div class="flex gap-2 lg:gap-3 items-center absolute right-0 md:static">
            <p class="hidden md:block">EN</p>
            <i class='bx bx-user-circle text-2xl hidden md:block lg:text-3xl'></i>
            <i class='bx bx-menu text-3xl lg:hidden ml-2'></i>
        </div>
    </div>
</nav>

<style>
    nav {
        transition: 0.3s ease;
    }
</style>