export interface Booking {
    id: number
    maPhong: number
    ngayDen: string
    ngayDi: string
    soLuongKhach: number
    maNguoiDung: number
}

export interface CreateBookingRequest {
    maPhong: number
    ngayDen: string
    ngayDi: string
    soLuongKhach: number
    maNguoiDung: number
}

export interface UpdateBookingRequest {
    id: number
    maPhong: number
    ngayDen: string
    ngayDi: string
    soLuongKhach: number
    maNguoiDung: number
}

export interface BookingResponse {
    statusCode: number
    content: Booking
    message: string
}

export interface BookingListResponse {
    statusCode: number
    content: Booking[]
    message: string
}
