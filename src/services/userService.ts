import type { AxiosRequestConfig } from 'axios'
import type { UpdateRequest, RegisterRequest } from '../types/user'
import api from './api'

export const userService = {
    list: (config?: AxiosRequestConfig & { skipLoading?: boolean }) => {
        return api.get('/users', { ...config })
    },
    update: (data: UpdateRequest) => {
        return api.put('/users/' + data.id, data)
    },
    uploadAvatar: (formFile: FormData, token: string) => {
        return api.post('/users/upload-avatar', formFile, {
            headers: {
                token,
            },
        })
    },
    create: (data: RegisterRequest) => {
        return api.post('/users', data)
    },
    delete: (id: number) => {
        return api.delete('/users?id=' + id)
    }
}
