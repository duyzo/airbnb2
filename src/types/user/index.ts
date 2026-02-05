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
    role?: 'ADMIN' | 'USER'
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

export interface UpdateRequest {
    id: number
    name?: string
    email?: string
    phone?: string
    birthday?: string
    avatar?: string
    gender?: boolean
    role: 'ADMIN' | 'USER'
}