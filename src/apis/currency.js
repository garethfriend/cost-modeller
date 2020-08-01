import axios from 'axios'

export default axios.create({
    baseURL: 'GET https://open.exchangerate-api.com/v6/latest'
})