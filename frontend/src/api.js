import axios from "axios";

const api = axios.create({
    baseURL: 'https://social-app-backend-vcwx.onrender.com'
});

export default api;