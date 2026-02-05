import api from './api'
import type {
    LocationListResponse,
    LocationListPagingResponse,
    LocationSearchParams,
    LocationCreateRequest,
    LocationCreateResponse,
    LocationUpdateRequest,
    LocationUpdateResponse,
} from '../types/location'
import type { AxiosRequestConfig } from 'axios'

export const locationService = {
    list: (config?: AxiosRequestConfig & { skipLoading?: boolean }) =>
        api.get<LocationListResponse>('/vi-tri', { ...config }),
    listPaging: (
        params: LocationSearchParams,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) =>
        api.get<LocationListPagingResponse>('/vi-tri/phan-trang-tim-kiem', {
            params,
            ...config,
        }),
    create: (data: LocationCreateRequest, token: string) => {
        return api.post<LocationCreateResponse>('/vi-tri', data, {
            headers: {
                token,
            },
        })
    },
    update: (data: LocationUpdateRequest, token: string) => {
        return api.put<LocationUpdateResponse>(`/vi-tri/${data.id}`, data, {
            headers: {
                token,
            },
        })
    },
    uploadImage: (formData: FormData, id: number, token: string) => {
        return api.post(`/vi-tri/upload-hinh-vitri?maViTri=${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                token,
            },
        })
    },
    delete: (id: number, token: string) => {
        return api.delete(`/vi-tri/${id}`, {
            headers: {
                token,
            },
        })
    }
}
