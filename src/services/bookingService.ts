import api from './api'
import type { BookingListResponse, BookingResponse, CreateBookingRequest } from '../types'

export const bookingService = {
    create: (data: CreateBookingRequest) => api.post<BookingResponse>('/dat-phong', data),
    byUser: (userId: number) => api.get<BookingListResponse>(`/dat-phong/lay-theo-nguoi-dung/${userId}`),
}
