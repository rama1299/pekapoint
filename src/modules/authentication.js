import { instance } from "./axios";
import Cookies from "js-cookie";

let data = import.meta.env.VITE_USER
data = JSON.parse(data)

export class Authentication {
    static async login() {
            try {
                const status = Cookies.get('status') // cek status di cookie

                if (!status) { //jika status undefined
                    const response = await instance.post(`/login`, data) // login dulu
                    if (response && response.status == 200) { // jika berhasil
                        await Cookies.set('status', 'success') // set status success di cookie
                    } else {
                        throw new Error('Login Failed')
                    }
                }
            } catch (error) {
                console.error(error.message)
            }
    }

    static async authAdmin() {
        try {
            const response = await instance.post(`/login/admin`, data)
            if (response.status == 200) {
                return response
            } else {
                throw new Error('Authenticaton error')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    static async loginAdmin(dataAdmin) {
        try {
            const response = await instance.post(`/login/admin`, dataAdmin)
            if(response.status == 200) {
                return response
            } else {
                throw new Error('Login error')
            }
        } catch (error) {
            console.error(error.message)
        }
    }
}