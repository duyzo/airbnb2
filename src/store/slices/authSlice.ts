import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'
import type {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    User,
} from '../../types/user'

export interface AuthState {
    user: User | null
    token: string | null
    loading: boolean
    error: string | null
}

const getStoredUser = (): User | null => {
    try {
        const userStr = localStorage.getItem('user')
        return userStr ? JSON.parse(userStr) : null
    } catch {
        return null
    }
}

const initialState: AuthState = {
    user: getStoredUser(),
    token: localStorage.getItem('access_token'),
    loading: false,
    error: null,
}

export const loginThunk = createAsyncThunk<
    { token: string; user: User },
    LoginRequest
>('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const { data } = await authService.login(payload)
        const { user, token } = data.content
        user.password = ''

        localStorage.setItem('access_token', token)
        localStorage.setItem('user', JSON.stringify(user))

        return { token, user }
    } catch (error: unknown) {
        const err = error as {
            response?: { data?: { message?: string; content?: string } }
        }
        return rejectWithValue(
            err.response?.data?.content ||
                err.response?.data?.message ||
                'Login failed',
        )
    }
})

export const registerThunk = createAsyncThunk<AuthResponse, RegisterRequest>(
    'auth/register',
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await authService.register(payload)
            // Signup API does not return token, only user info
            return data
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(
                err.response?.data?.message || 'Register failed',
            )
        }
    },
)

export const meThunk = createAsyncThunk<User>(
    'auth/me',
    async (_, { rejectWithValue }) => {
        try {
            // there is no api called /auth/auth-login to verify, therefor using data stored in localStorage to simulate

            const userStr = localStorage.getItem('user')
            const token = localStorage.getItem('access_token')

            if (!userStr || !token) {
                return rejectWithValue('No session found')
            }
            const user = JSON.parse(userStr) as User

            return user
        } catch (error: unknown) {
            localStorage.removeItem('user')
            localStorage.removeItem('access_token')

            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(
                err.response?.data?.message || 'Fetch profile failed',
            )
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
            localStorage.removeItem('user')
        },
        changeUserInfo(state, action) {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
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
                state.user = action.payload
            })
            .addCase(meThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
                state.user = null
                state.token = null
                localStorage.removeItem('access_token')
                localStorage.removeItem('user')
            })
    },
})

export const { logout, changeUserInfo } = authSlice.actions
export default authSlice.reducer
