import { instance } from "./axios";
import { Authentication } from "./authentication";
import Cookies from "js-cookie";

export class FetchExchange {
    static async getExchageByCode(code) {
        try {
            await Authentication.login()

            const response = await instance.get(`/exchangerates/update/${code}`)
            
            if (response.status == 200) {
                return response
            } else if (response.status === 401) { 

                Cookies.remove('status')
                await Authentication.login() 
                const response = await instance.get(`/exchangerates/update/${code}`);

                return response
            } else {
                throw new Error('Exchangerates error')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async getExchagerates() {
        try {
            await Authentication.login()

            const response = await instance.get(`/exchangerates`)
            
            if (response.status == 200) {
                return response
            } else if (response.status === 401) { 

                Cookies.remove('status')
                await Authentication.login() 
                const response = await instance.get(`/exchangerates`);

                return response
            } else {
                throw new Error('Exchangerates error')
            }

        } catch (error) {
            console.error(error.message);
        }
    }
}