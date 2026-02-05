import api from './api'
import type {
    RoomByLocationResponse,
    RoomListPaginationResponse,
    RoomListResponse,
    RoomSearchParams,
    RoomByIdResponse,
    RoomCreateRequest,
    RoomUpdateRequest,
    RoomCreateResponse,
    RoomUpdateResponse,
} from '../types/room'
import type { AxiosRequestConfig } from 'axios'

export const roomService = {
    list: (config?: AxiosRequestConfig & { skipLoading?: boolean }) =>
        api.get<RoomListResponse>('/phong-thue', { ...config }),
    listPaging: (
        params?: RoomSearchParams,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) =>
        api.get<RoomListPaginationResponse>('/phong-thue/phan-trang-tim-kiem', {
            params,
            ...config,
        }),
    byId: (
        id: number,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) => api.get<RoomByIdResponse>(`/phong-thue/${id}`, { ...config }),
    byLocation: (
        locationId: number,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) =>
        api.get<RoomByLocationResponse>(
            `/phong-thue/lay-phong-theo-vi-tri?maViTri=${locationId}`,
            { ...config },
        ),
    create: (data: RoomCreateRequest, token: string) => {
        return api.post<RoomCreateResponse>('/phong-thue', data, {
            headers: {
                token,
            },
        })
    },
    update: (data: RoomUpdateRequest, token: string) => {
        return api.put<RoomUpdateResponse>(`/phong-thue/${data.id}`, data, {
            headers: {
                token,
            },
        })
    },
    uploadImage: (formData: FormData, id: number, token: string) => {
        return api.post(
            `/phong-thue/upload-hinh-phong?maPhong=${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token,
                },
            },
        )
    },
    delete: (id: number, token: string) => {
        return api.delete(`/phong-thue/${id}`, {
            headers: {
                token,
            },
        })
    },
}
