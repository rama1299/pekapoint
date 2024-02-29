import axios from 'axios';
import { writable } from 'svelte/store';

export let compareDataStore = writable([])
export let isFilterProduct = writable(false)
export let pageProductList = writable(1)
export let enableDataToCompare = writable([])
export const dataBrand = writable([]);

export async function fetchDataBrand() {
  try {

    const response = await axios.get('your_api_endpoint');
    dataBrand.set(response.data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}