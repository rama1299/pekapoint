import { instance } from "./axios";

export class FetchAds {
    static async getAllAds(page) {
        const query = page ? `?page=${page}` : ''
        try {
            const response = await instance.get(`/ads${query}`)
            return response
        } catch (error) {
            console.log('get all ads error')
        }
    }

    static async getAdsById(id) {
        try {
            const response = await instance.get(`/ads/${id}`)
            return response
        } catch (error) {
            console.log('get all ads error')
        }
    }

    static async createAds(data) {
        try {
            const response = await instance.post(`/ads`, data)
            return response
        } catch (error) {
            console.log('create ads error')
        }
    }

    static async updateAds(data, id) {
        try {
            const response = await instance.put(`/ads/${id}`, data)
            return response
        } catch (error) {
            console.log('create ads error')
        }
    }

    static async deleteAds(id) {
        try {
            const response = await instance.delete(`/ads/${id}`)
            return response
        } catch (error) {
            console.log('get all ads error')
        }
    }
}