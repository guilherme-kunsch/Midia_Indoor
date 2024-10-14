import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

let API_URL : string = 'http://localhost:8080'


class API {
    readonly request: AxiosInstance
    constructor() {
        this.request = axios.create({headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }})
        if(import.meta.env.REACT_APP_ENV === "prod") {
            this.request.defaults.baseURL =  import.meta.env.REACT_APP_ENV
        } else {
            this.request.defaults.baseURL = "http://localhost:8080"
        }
    }

    async get(path: string, config?: AxiosRequestConfig) {
        return this.request.get(path, config).catch((err) => {
            console.log("[API:GET]", err)
            return err
        })
    }
}

export default API
