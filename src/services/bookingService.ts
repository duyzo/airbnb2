import api from './api'
import type {
    BookingListResponse,
    BookingResponse,
    CreateBookingRequest,
    UpdateBookingRequest,
} from '../types/booking'
import type { AxiosRequestConfig } from 'axios'

export const bookingService = {
    list: (config?: AxiosRequestConfig & { skipLoading?: boolean }) => {
        return api.get('/dat-phong', { ...config })
    },
    create: (
        data: CreateBookingRequest,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) => api.post<BookingResponse>('/dat-phong', data, { ...config }),
    byUser: (
        userId: number,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) =>
        api.get<BookingListResponse>(
            `/dat-phong/lay-theo-nguoi-dung/${userId}`,
            { ...config },
        ),
    update: (
        data: UpdateBookingRequest,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) => {
        return api.put<BookingResponse>(`/dat-phong/${data.id}`, data, {
            ...config,
        })
    },
    delete: (
        bookingId: number,
        config?: AxiosRequestConfig & { skipLoading?: boolean },
    ) =>
        api.delete<BookingResponse>(`/dat-phong/${bookingId}`, {
            ...config,
        }),
}
