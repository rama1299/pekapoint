import { FetchExchange } from "../modules/fetchExchange";

export async function getExchagerates() {
    try {
        const currencyFromSession = window.sessionStorage.getItem('exchagerates');

        if (!currencyFromSession) {
            const getExchagerates = await FetchExchange.getExchagerates()

            if (getExchagerates && getExchagerates.status == 200) {
                let data = getExchagerates.data

                let findDataIDR = data.find((item) => item.code == 'IDR')

                window.sessionStorage.setItem('exchagerates', JSON.stringify(getExchagerates.data))
                window.sessionStorage.setItem('currency', JSON.stringify(findDataIDR))

                return getExchagerates.data
            }
        
            return ''
        } else {
            return JSON.parse(currencyFromSession)
        }
    } catch (error) {
        console.error(error.message)
    }
}