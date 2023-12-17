import { writable } from 'svelte/store';

export let compareDataStore = writable([])
export let isFilterProduct = writable(false)
export let pageProductList = writable(1)
export let enableDataToCompare = writable([])