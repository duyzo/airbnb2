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
