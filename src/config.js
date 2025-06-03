import axios from "axios"

export const AxiosInstance = axios.create({
    baseURL: "http://localhost:5001/"
})

// http://localhost:5001/