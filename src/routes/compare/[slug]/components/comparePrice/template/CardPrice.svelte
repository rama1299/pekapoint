<script>
    import { formatCurrency } from "../../../../../../helpers/currency";
</script>

<div class="w-full">
    <div class="w-full grid grid-flow-row p-3 shadow-lg border-2 hover:border-sekunder-950 rounded-md gap-2 bg-white">
        <div class="w-full flex justify-between items-center font-medium text-sm">
            <div class="w-1/2 flex justify-start items-center gap-1">
                <div class="w-10 aspect-square rounded-md bg-orange-500"></div>
                <p class="leading-5">Kafa Store</p>
            </div>
            <div class="w-1/2 flex justify-end items-center">
                <p>4.5</p>
            </div>
        </div>
        <div class="flex justify-center items-center">
            <p class="text-lg font-semibold cursor-pointer text-accent-red-600">{formatCurrency(16400000)}</p>
        </div>
        <div class="w-full flex justify-center items-center">
            <button class="bg-sekunder-950 hover:bg-primary-500 text-white hover:text-sekunder-950 rounded-md duration-100 w-full py-1">Detail</button>
        </div>
    </div>
</div>