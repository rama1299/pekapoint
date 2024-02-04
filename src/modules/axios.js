import axios from "axios";
import Cookies from "js-cookie";

const port = import.meta.env.VITE_PORT

const instance = axios.create({
    baseURL: `http://localhost:${port}/api`,
    validateStatus: false,
})

export {instance}