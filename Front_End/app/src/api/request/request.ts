import Axios from "axios"
let service = Axios.create({
    baseURL: 'http://localhost:1919',
    timeout:30000
})
export default service;