// User Types
export interface User {
    id: number
    name: string
    email: string
    password?: string
    phone: string
    birthday: string
    avatar?: string
    gender: boolean
    role: 'ADMIN' | 'USER'
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
    phone: string
    birthday: string
    gender: boolean
}

export interface AuthResponse {
    statusCode: number
    content: User
    dateTime?: string
    message?: string
}

export interface LoginResponse {
    statusCode: number
    content: {
        user: User
        token: string
    }
    dateTime?: string
    message?: string
}

// Location Types
export interface Location {
    id: number
    tenViTri: string
    tinhThanh: string
    quocGia: string
    hinhAnh: string
}

export interface LocationResponse {
    statusCode: number
    content: Location[]
    message: string
}

// Room Types
export interface Room {
    id: number
    tenPhong: string
    khach: number
    phongNgu: number
    giuong: number
    phongTam: number
    moTa: string
    giaTien: number
    mayGiat: boolean
    banLa: boolean
    tivi: boolean
    dieuHoa: boolean
    wifi: boolean
    bep: boolean
    doXe: boolean
    hoBoi: boolean
    banUi: boolean
    maViTri: number
    hinhAnh: string
}

export interface RoomSearchParams {
    pageIndex?: number
    pageSize?: number
    keyword?: string
}

export interface RoomPaginationResponse {
    statusCode: number
    content: {
        data: Room[]
        pageIndex: number
        pageSize: number
        totalRow: number
    }
    message: string
}

export interface RoomResponse {
    statusCode: number
    content: Room
    message: string
}

export interface RoomByLocationResponse {
    statusCode: number
    content: Room[]
    message: string
}

// Booking Types
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

// Comment Types
export interface Comment {
    id: number
    maPhong: number
    maNguoiBinhLuan: number
    ngayBinhLuan: string
    noiDung: string
    saoBinhLuan: number
}

export interface CommentResponse {
    statusCode: number
    content: Comment[]
    message: string
}

export interface CreateCommentRequest {
    maPhong: number
    maNguoiBinhLuan: number
    ngayBinhLuan: string
    noiDung: string
    saoBinhLuan: number
}

// API Response Types
export interface ApiError {
    statusCode: number
    content: string | null
    message: string
}

export interface UploadImageResponse {
    statusCode: number
    content: {
        id: number
        hinhAnh: string
    }
    message: string
}
