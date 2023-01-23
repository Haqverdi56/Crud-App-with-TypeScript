import axios from 'axios'

export const apiInstance = axios.create({
    baseURL:'https://northwind.vercel.app/api',
    timeout:2000
})