import { instance } from "./axios";

export class FetchCsv {
    static async getCsvClient() {
        try {
            const response = await instance.get(`http://localhost:3000/api/csv-client`)
            return response
        } catch (error) {
            console.error("Error fetching:", error.response.data.message || error.message);
            throw error;
        }
    }

    static async getCsvServer() {
        try {
            const response = await instance.get(`http://localhost:3000/api/csv-server`)
            return response
        } catch (error) {
            console.error("Error fetching:", error.response.data.message || error.message);
            throw error;
        }
    }
}