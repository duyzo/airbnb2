import axios, { type InternalAxiosRequestConfig } from 'axios'
import { store } from '../store'
import { startLoading, stopLoading } from '../store/slices/loadingSlice'

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
    skipLoading?: boolean
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        tokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
    },
})

api.interceptors.request.use(
    (config: CustomAxiosConfig) => {
        const isGetMethod = config.method?.toLowerCase() === 'get'
        const shouldSkipLoading = config.skipLoading ?? isGetMethod

        if (!shouldSkipLoading) {
            store.dispatch(startLoading())
        }

        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        store.dispatch(stopLoading())
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        store.dispatch(stopLoading())
        return response
    },
    (error) => {
        store.dispatch(stopLoading())
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token')
            window.location.href = '/auth'
        }
        return Promise.reject(error)
    },
)

export default api
