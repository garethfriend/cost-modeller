import axios from 'axios'

export default axios.create({
    baseURL: 'https://open.exchangerate-api.com/v6/latest'
})