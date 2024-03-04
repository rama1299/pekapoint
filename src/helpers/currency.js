import { browser } from "$app/environment";

export function formatCurrencyIDR(amount) {
    const amountInt = parseInt(amount)
    const formattedAmount = amountInt.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    return formattedAmount.slice(0, -3);
}

export function formatCurrency(number) {

    let currencyCode = 'IDR'
    let convertNumber = number

    let currentCurrency = browser && sessionStorage.getItem('currency')
    let exchagerates = browser && sessionStorage.getItem('exchagerates')

    if(currentCurrency && exchagerates) {
        currentCurrency = JSON.parse(currentCurrency)
        exchagerates = JSON.parse(exchagerates)

        let exchageratesIDR = exchagerates.find((item) => item.code == 'IDR')

        convertNumber = (number / parseFloat(exchageratesIDR.rate)) * parseFloat(currentCurrency.rate)

        convertNumber = Math.ceil(convertNumber)
        currencyCode = currentCurrency.code
    }

    const options = {
      style: 'currency',
      currency: currencyCode,
    };
  
    // Tentukan negara berdasarkan kode mata uang
    let locale;
    switch (currencyCode) {
      case 'IDR':
        locale = 'id-ID'; // Indonesia
        break;
      case 'USD':
        locale = 'en-US'; // Amerika Serikat
        break;
      case 'JPY':
        locale = 'ja-JP'; // Jepang
        break;
      case 'SGD':
        locale = 'en-SG'; // Singapura
        break;
      case 'EUR':
        locale = 'fr-FR'; // Jerman (anda bisa memilih negara yang menggunakan EUR)
        break;
      case 'CNY':
        locale = 'zh-CN'; // Tiongkok
        break;
      case 'AED':
        locale = 'ar-AE'; // Uni Emirat Arab
        break;
      default:
        locale = 'en-US'; // Default ke Amerika Serikat jika tidak ada cocokan
    }
  
    return convertNumber.toLocaleString(locale, options).replace(/,/g, '.').slice(0, -3)
}
  