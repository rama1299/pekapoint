import { instance } from "./axios";
import Cookies from "js-cookie";
import { Authentication } from "./authentication";

export class FetchProductUrl {
    static async getProductUrlCompare(query) {
        try {
            await Authentication.login()

            const response = await instance.get(`/product-url${query}`);

            if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product-url${query}`);

                return response
            }

            return response;
        } catch (error) {
            console.error("Error fetching products:", error.response.data.message || error.message);
            throw error;
        }
    }

    static async getProductUrlByUrl(url) {
        try {
            await Authentication.login()

            const response = await instance.post(`/product-url`, {url});

            if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.post(`/product-url`, {url});

                return response
            }

            return response;
        } catch (error) {
            console.error("Error fetching products:", error.response.data.message || error.message);
            throw error;
        }
    }

    static async createProductUrl(data) {
        try {
            await Authentication.login()

            const response = await instance.post(`/product-url/create`, data);

            if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.post(`/product-url/create`, data);

                return response
            }

            return response;
        } catch (error) {
            console.error("Error fetching products:", error.response.data.message || error.message);
            throw error;
        }
    }
}