import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../../types'

interface AuthState {
    user: User | null
    token: string | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('access_token'),
    loading: false,
    error: null,
}

export const loginThunk = createAsyncThunk<{ token: string; user: User }, LoginRequest>(
    'auth/login',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await authService.login(payload)
            const { user, token } = data.content
            localStorage.setItem('access_token', token)
            return { token, user }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string, content?: string } } }
            return rejectWithValue(err.response?.data?.content || err.response?.data?.message || 'Login failed')
        }
    },
)

export const registerThunk = createAsyncThunk<AuthResponse, RegisterRequest>(
    'auth/register',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await authService.register(payload)
            // Signup API does not return token, only user info
            return data
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(err.response?.data?.message || 'Register failed')
        }
    },
)

export const meThunk = createAsyncThunk<AuthResponse>(
    'auth/me',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await authService.me()
            return data
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(err.response?.data?.message || 'Fetch profile failed')
        }
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null
            state.token = null
            localStorage.removeItem('access_token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(registerThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.content
                // No token from signup, user needs to login
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(meThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(meThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.content
            })
            .addCase(meThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                state.user = null
                state.token = null
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
