import { instance } from "./axios";
import Cookies from "js-cookie";
import { Authentication } from "./authentication";

export class FetchProductUrl {
    static async getProductUrl(item, query) {
        try {
            await Authentication.login()

            const response = await instance.get(`/product-url/${item}${query}`);

            if( response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product-url/${item}${query}`);

                return response
            } else {
                throw new Error('Error get product url')
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    static async getProductUrlByUrl(url) {
        try {
            await Authentication.login()

            const response = await instance.post(`/product-url`, {url});

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.post(`/product-url`, {url});

                return response
            } else {
                throw new Error('Error get product by url')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async createProductUrl(data) {
        try {
            await Authentication.login()

            const response = await instance.post(`/product-url/create`, data);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.post(`/product-url/create`, data);

                return response
            } else {
                throw new Error('error create Product rl')
            }

        } catch (error) {
            console.error(error.message);
        }
    }
}