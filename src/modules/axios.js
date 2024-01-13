import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    validateStatus: false,
})

export {instance}