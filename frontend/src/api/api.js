import axios from "axios"

// let REACT_APP_API_URL = 'http://localhost:8080'
// if(process.env.REACT_APP_ENV === "prod") {
//     REACT_APP_API_URL = process.env.REACT_APP_API_URL
// }
let REACT_APP_API_URL = 'https://mastigadores-api.onrender.com'
console.log(process.env.REACT_APP_ENV, REACT_APP_API_URL)
class API {
    async request(url, method, data = {}, config = {}) {
        const methodLower = method.toLowerCase()
        try {
            return await axios(
                {
                    url: `${REACT_APP_API_URL}${url}`,
                    method: methodLower,
                    data,
                    ...config
                }
            )
        } catch (err) {
            return err.response
        }
    }
    async get(url, config = {}) {
        return await this.request(url, 'GET', undefined, config)
    }

    async post(url, data = {}, config = {}) {
        return await this.request(url, 'POST', data, config)
    }
    async patch(url, data = {}, config = {}) {
        return await this.request(url, 'PATCH', data, config)
    }

    async delete(url) {
        return await this.request(url, 'DELETE', undefined, undefined)
    }
}

export default new API()