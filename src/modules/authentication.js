import { instance } from "./axios";
import { getCookie, setCookie } from "../helpers/cookies";
import Cookies from "js-cookie";

const data = JSON.parse(import.meta.env.VITE_USER)

export class Authentication {
    static async login() {
            try {

                const status = Cookies.get('status') // cek status di cookie

                if (!status) { //jika status undefined
                    const response = await instance.post(`/login`, data) // login dulu
                    if (response && response.status == 200) { // jika berhasil
                        const setStatusToCookie = await setCookie('status', 'success') // set status success di cookie
                    } else {
                        console.error(response.data.message)
                    }
                }
            } catch (error) {
                console.log(error)
            }
    }
}