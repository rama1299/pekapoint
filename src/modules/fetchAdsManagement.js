import { instance } from "./axios";

export class FetchAds {
    static async getAllAds() {
        try {
            const response = await instance.get(`/ads`)
            return response
        } catch (error) {
            console.log('get all ads error')
        }
    }
}