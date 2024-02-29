export class Api {
    static async getGeoInfo() {
        try {           
            const checkExchange = Cookies.get('exchange')
            if (!checkExchange) {
                const geoInfo = await checkIpInfo()
                let {currency} = geoInfo

                if (currency.length > 3) {
                    const arrayCurrency = currency.split(",")
                    currency = arrayCurrency[0]
                }

                const getExchange = await instance.get(`${domainApi}/exchangerates/update/${currency}`)
                
                if (getExchange.status == 200) {
                    const dataExchange = getExchange.data
                    Cookies.set('exchange', JSON.stringify(dataExchange))
                } else {
                    Cookies.set('exchange', "")
                }

            }
        } catch (error) {
            console.error('error geoinfo')
        }
    }
}