import { instance } from "./axios";

export class FetchCsv {
    static async getCsvClient() {
        try {
            const response = await instance.get(`/csv-client`)
            if(response.status == 200) {
                return response
            } else {
                throw new Error('failed get csv client')
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    static async getCsvServer() {
        try {
            const response = await instance.get(`/csv-server`)
            if(response.status == 200) {
                return response
            } else {
                throw new Error('failed get csv server')
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}