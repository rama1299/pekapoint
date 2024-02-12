import { instance } from "./axios";
import { Authentication } from "./authentication";
import Cookies from "js-cookie";

export class FetchExchange {
    static async getExchageByCode(code) {
        try {
            await Authentication.login()

            const response = await instance.get(`/exchangerates/update/${code}`)

            if (response.status === 401) { 

                Cookies.remove('status')
                await Authentication.login() 
                const response = await instance.get(`/exchangerates/update/${code}`);

                return response
            }

            return response
        } catch (error) {
            console.error("Error fetching:", error.response.data.message || error.message);
            throw error;
        }
    }
}