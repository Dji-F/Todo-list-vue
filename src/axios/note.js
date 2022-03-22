import axios from 'axios'
import router from '../router'

const noteAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URL
})

noteAxios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth')
    }

    return Promise.reject(error);
});

export default noteAxios
