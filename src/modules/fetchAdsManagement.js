import { instance } from "./axios";

export class FetchAds {
    static async getAllAds(page) {
        const query = page ? `?page=${page}` : ''
        try {
            const response = await instance.get(`/ads${query}`)
            if (response && response.status == 200) {
                return response
            } else {
                throw new Error('Get ads failed')
            }
         } catch (error) {
            console.error('error')
        }
    }

    static async getAdsById(id) {
        try {
            const response = await instance.get(`/ads/${id}`)
            if (response.status == 200) {
                return response
            } else {
                throw new Error('Get ads by id failed')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    static async createAds(data) {
        try {
            const response = await instance.post(`/ads`, data)
            if (response.status == 200) {
                return response
            } else {
                throw new Error('Get ads failed')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    static async updateAds(data, id) {
        try {
            const response = await instance.put(`/ads/${id}`, data)
            if (response.status == 200) {
                return response
            } else {
                throw new Error('Get ads failed')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    static async deleteAds(id) {
        try {
            const response = await instance.delete(`/ads/${id}`)
            if (response.status == 200) {
                return response
            } else {
                throw new Error('Get ads failed')
            }
        } catch (error) {
            console.error(error.message)
        }
    }
}