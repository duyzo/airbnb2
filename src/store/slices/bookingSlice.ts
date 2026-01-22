import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { bookingService } from '../../services/bookingService'
import type { Booking, BookingListResponse, CreateBookingRequest } from '../../types'

interface BookingState {
    items: Booking[]
    loading: boolean
    error: string | null
}

const initialState: BookingState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchBookingsByUserThunk = createAsyncThunk<BookingListResponse, number>(
    'booking/byUser',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await bookingService.byUser(userId)
            return data
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(err.response?.data?.message || 'Fetch bookings failed')
        }
    },
)

export const createBookingThunk = createAsyncThunk<BookingListResponse, CreateBookingRequest>(
    'booking/create',
    async (payload, { rejectWithValue }) => {
        try {
            await bookingService.create(payload)
            const list = await bookingService.byUser(payload.maNguoiDung)
            return list.data
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(err.response?.data?.message || 'Create booking failed')
        }
    },
)

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingsByUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBookingsByUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.content
            })
            .addCase(fetchBookingsByUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(createBookingThunk.fulfilled, (state, action) => {
                state.items = action.payload.content
            })
    },
})

export default bookingSlice.reducer
