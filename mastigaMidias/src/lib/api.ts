import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

class API {
    readonly request: AxiosInstance
    constructor() {
        this.request = axios.create({headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }})
            this.request.defaults.baseURL =  import.meta.env.VITE_API_URL
    }

    async get(path: string, config?: AxiosRequestConfig)  {
        return this.request.get(path, config).catch((err) => {
            console.log("[API:GET]", err)
            return err
        })
    }
}

export default API
