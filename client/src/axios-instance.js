import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000'
})

instance.defaults.headers.common['x-access-token'] = localStorage.getItem('token') || null;

export default instance;