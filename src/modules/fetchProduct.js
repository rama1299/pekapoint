import { instance } from "./axios";
import { Authentication } from "./authentication";
import Cookies from "js-cookie";

export class FetchProduct {
    static async getProducts(query) {
        try {
            await Authentication.login() // Sebelum fetch login dulu

            const response = await instance.get(`/product${query}`); //fetch data
            
            if (response.status === 401) { // jika status 401

                Cookies.remove('status') //hapus status login
                await Authentication.login() // login kembali
                const response = await instance.get(`/product${query}`); // fetch data lagi

                return response
            }

            // jika tidak 401 kembalikan
            return response;
        } catch (error) {
            console.error("Error fetching products:", error.message);
            throw error;
        }
    }

    static async getBrandProducts() {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product/brand`);

            if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product/brand`);

                return response
            }

            return response;
        } catch (error) {
            console.error("Error fetching products:", error.message);
            throw error;
        }
    }

    static async getProductBySlug(slug) {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product/${slug}`);

            if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product/${slug}`);

                return response
            }

            return response;
        } catch (error) {
            console.error(`Error fetching product by slug ${slug}:`, error.message);
            throw error;
        }
    }

    static async getSpecProductById(id) {
        try {
            await Authentication.login()
            
            const response = await instance.get(`/product/spec/${id}`);

            if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.get(`/product/spec/${id}`);

                return response
            }

            return response;
        } catch (error) {
            console.error(`Error fetching spec product by ID ${id}:`, error.message);
            throw error;
        }
    }

    static async getProductSearch(search, page) {
        try {
            await Authentication.login()

            const queryPage = page ? `?page=${page}` : ''
            const data = {search}
            
            const response = await instance.post(`/product/search${queryPage}`, data);

            if (response.status === 401) {

                Cookies.remove('status')
                await Authentication.login()
                const response = await instance.post(`/product/search${queryPage}`, data);

                return response
            }

            return response;
        } catch (error) {
            console.error(`Error fetching spec product by Search ${search}:`, error.message);
            throw error;
        }
    }
}
