import { instance } from "./axios";
import { Authentication } from "./authentication";
import Cookies from "js-cookie";
import { checkIpInfo } from "../helpers/checkIpInfo";

export class FetchHpVariant {
    static async getVariantById(id) {

        let country = await checkIpInfo()
        let query = country ? `?country=${country}` : ''
        try {
            await Authentication.login()

            const response = await instance.get(`http://localhost:3000/api/variant/${id}${query}`)

            if (response.status === 401) { 

                Cookies.remove('status')
                await Authentication.login() 
                const response = await instance.get(`http://localhost:3000/api/variant/${id}${query}`);

                return response
            }

            return response
        } catch (error) {
            console.error("Error fetching brand products:", error.response.data.message || error.message);
            throw error;
        }
    }
}