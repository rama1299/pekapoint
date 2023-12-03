export function formatCurrencyIDR(amount) {
    const amountInt = parseInt(amount)
    const formattedAmount = amountInt.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    return formattedAmount.slice(0, -3);
}