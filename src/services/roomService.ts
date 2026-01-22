import api from './api'
import type { RoomByLocationResponse, RoomPaginationResponse, RoomResponse, RoomSearchParams } from '../types'

export const roomService = {
    list: (params?: RoomSearchParams) =>
        api.get<RoomPaginationResponse>('/phong-thue/phan-trang-tim-kiem', { params }),
    byId: (id: number) => api.get<RoomResponse>(`/phong-thue/${id}`),
    byLocation: (locationId: number) => api.get<RoomByLocationResponse>(`/phong-thue/lay-phong-theo-vi-tri/${locationId}`),
}
