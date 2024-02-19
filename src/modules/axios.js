import axios from "axios";
import Cookies from "js-cookie";

const port = import.meta.env.VITE_PORT
const domainApi = import.meta.env.VITE_DOMAIN_API


const instance = axios.create({
    baseURL: `${domainApi}`,
    validateStatus: false,
})

export {instance}