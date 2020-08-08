import axios from 'axios'

export default axios.create({
    baseURL: 'https://open.exchangerate-api.com/v6/latest'
    // baseURL: 'https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD'
})