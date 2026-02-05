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

export interface RoomListPaginationResponse {
    statusCode: number
    content: {
        data: Room[]
        pageIndex: number
        pageSize: number
        totalRow: number
    }
    message: string
}

export interface RoomListResponse {
    statusCode: number
    content: Room[]
    message: string
}

export interface RoomByLocationResponse {
    statusCode: number
    content: Room[]
    message: string
}

export interface RoomByIdResponse {
    statusCode: number
    content: Room
    message: string
}

export interface RoomCreateRequest {
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

export interface RoomUpdateRequest {
    id: number
    tenPhong?: string
    khach?: number
    phongNgu?: number
    giuong?: number
    phongTam?: number
    moTa?: string
    giaTien?: number
    mayGiat?: boolean
    banLa?: boolean
    tivi?: boolean
    dieuHoa?: boolean
    wifi?: boolean
    bep?: boolean
    doXe?: boolean
    hoBoi?: boolean
    banUi?: boolean
    maViTri?: number
    hinhAnh?: string
}

export interface RoomCreateResponse {
    statusCode: number
    content: Room
    message: string
}

export interface RoomUpdateResponse {
    statusCode: number
    content: Room
    message: string
}
