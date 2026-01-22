import api from './api'
import type { LoginRequest, RegisterRequest, AuthResponse, LoginResponse } from '../types'

export const authService = {
    login: (data: LoginRequest) => api.post<LoginResponse>('/auth/signin', data),
    register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/signup', data),
    me: () => api.post<AuthResponse>('/auth/auth-login'),
}
