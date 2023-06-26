import axios from 'axios'
const BASE_URL = 'https://api.cotripal.com.br/microservicos/v1'

const microservicos = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type'  : 'application/json',
        'accept'        : 'application/json',
        'api-key'       : 'M5P7Q8RATBUCWEXFYH2J3K4N6P7Q9SATBVDWEXGZH2J4M5N6Q8R9SBUCVD'
    }
})

export default microservicos