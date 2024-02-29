import { instance } from "./axios";
import { Authentication } from "./authentication";
import Cookies from "js-cookie";
import { checkIpInfo } from "../helpers/checkIpInfo";

export class FetchProduct {
    static async getProducts(query) {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product${query}`);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) { // jika status 401

                Cookies.remove('status') //hapus status login
                await Authentication.login() // login kembali
                const response = await instance.get(`/product${query}`);

                return response
            } else {
                throw new Error('Error get product')
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    static async getBrandProducts() {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product/brand`);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product/brand`);

                return response
            } else {
                throw new Error('Error get brand')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async getTopProducts() {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product/top`);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product/top`);

                return response
            } else {
                throw new Error('Error get top product')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async getProductBySlug(slug) {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product/${slug}`);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product/${slug}`);

                return response
            } else {
                throw new Error('Error get product by slug')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async getSpecProductById(id) {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product/spec/${id}`);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product/spec/${id}`);

                return response
            } else {
                throw new Error('Error get product spec by id')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async getProductSearch(search, page) {
        try {
            await Authentication.login()

            const queryPage = page ? `?page=${page}` : ''

            const data = {search}
            
            const response = await instance.post(`/product/search${queryPage}`, data);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.post(`/product/search${queryPage}`, data);

                return response
            } else {
                throw new Error('Error get product search')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async getHomeProducts() {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/home-product`);

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/home-product`);

                return response
            } else {
                throw new Error('Error get home product')
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    static async getFeatureImageByTitle(title) {
        try {
            await Authentication.login()
            
            const response = await instance.post(`/product/image`, {title});

            if (response.status == 200) {
                return response
            } else if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.post(`/product/image/${slug}`);

                return response
            } else {
                throw new Error('Error get feature image')
            }

        } catch (error) {
            console.error(error.message);
        }
    }
}