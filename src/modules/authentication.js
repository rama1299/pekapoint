import { instance } from "./axios";
import { getCookie, setCookie } from "../helpers/cookies";
import Cookies from "js-cookie";
import { checkIpInfo } from "../helpers/checkIpInfo";

let data = import.meta.env.VITE_USER
data = JSON.parse(data)

export class Authentication {
    static async login() {
            try {

                const checkExchange = Cookies.get('exchange')
                if (!checkExchange) {
                    const geoInfo = await checkIpInfo()
                    let {currency} = geoInfo
    
                    if (currency.length > 3) {
                        const arrayCurrency = currency.split(",")
                        currency = arrayCurrency[0]
                    }
    
                    const getExchange = await instance.get(`http://localhost:3000/api/exchangerates/update/${currency}`)
                    
                    if (getExchange.status == 200) {
                        const dataExchange = getExchange.data
                        Cookies.set('exchange', JSON.stringify(dataExchange))
                    } else {
                        Cookies.set('exchange', "")
                    }
    
                }

                const status = Cookies.get('status') // cek status di cookie

                if (!status) { //jika status undefined
                    const response = await instance.post(`/login`, data) // login dulu
                    if (response && response.status == 200) { // jika berhasil
                        const setStatusToCookie = await setCookie('status', 'success') // set status success di cookie
                    } else {
                        console.error(response.data.message)
                    }
                }
            } catch (error) {
                console.log(error)
            }
    }
}