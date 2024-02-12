import { instance } from "./axios";
import { Authentication } from "./authentication";
import Cookies from "js-cookie";
import { checkIpInfo } from "../helpers/checkIpInfo";

export class FetchHpVariant {
    static async getVariantById(id) {

        let geoInfo = await checkIpInfo()
        let query = geoInfo ? `?country=${geoInfo.iso_code}` : ''
        try {
            await Authentication.login()

            const response = await instance.get(`/variant/${id}${query}`)

            if (response.status === 401) { 

                Cookies.remove('status')
                await Authentication.login() 
                const response = await instance.get(`/variant/${id}${query}`);

                return response
            }

            return response
        } catch (error) {
            console.error("Error fetching:", error.response.data.message || error.message);
            throw error;
        }
    }
}