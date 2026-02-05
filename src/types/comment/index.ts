export interface Comment {
    id: number
    maPhong: number
    maNguoiBinhLuan: number
    ngayBinhLuan: string
    noiDung: string
    saoBinhLuan: number
    tenNguoiBinhLuan?: string
    avatar?: string
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

export interface CreateCommentResponse {
    statusCode: number
    content: Comment
    message: string
    dateTime: string
}
