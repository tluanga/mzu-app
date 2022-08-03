import axios from 'axios'
const baseURL='http://localhost:8000'
export default axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        "Content-type":"application/json"
    }
})