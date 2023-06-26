import axios from 'axios'
const BASE_URL = 'http://10.10.10.159:8000'
// const BASE_URL = 'http://127.0.0.1:8000'

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type' : 'application/json',
        'accept'       : 'application/json'
    }
})

export default instance