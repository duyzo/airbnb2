export interface Location {
    id: number
    tenViTri: string
    tinhThanh: string
    quocGia: string
    hinhAnh: string
}

export interface LocationPaging {
    pageIndex: number,
    pageSize: 4,
    totalRow: 25,
    keywords: null,
    data: Location[]
}

export interface LocationListResponse {
    statusCode: number
    content: Location[]
    message: string
}

export interface LocationListPagingResponse {
    statusCode: number
    content: LocationPaging
    message: string
}

export interface LocationSearchParams {
    pageIndex: number
    pageSize: number
    keyword?: string
}

export interface LocationCreateRequest {
    tenViTri: string
    tinhThanh: string
    quocGia: string
    hinhAnh: string
}

export interface LocationCreateResponse {
    statusCode: number
    content: Location
    message: string
    dateTime: string
}

export interface LocationUpdateRequest {
    id: number
    tenViTri?: string
    tinhThanh?: string
    quocGia?: string
    hinhAnh?: string
}

export interface LocationUpdateResponse {
    statusCode: number
    content: Location
    message: string
    dateTime: string
}