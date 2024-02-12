import { instance } from "./axios";

export class FetchCsv {
    static async getCsvClient() {
        try {
            const response = await instance.get(`/csv-client`)
            return response
        } catch (error) {
            console.error("Error fetching:", error.response.data.message || error.message);
            throw error;
        }
    }

    static async getCsvServer() {
        try {
            const response = await instance.get(`/csv-server`)
            return response
        } catch (error) {
            console.error("Error fetching:", error.response.data.message || error.message);
            throw error;
        }
    }
}