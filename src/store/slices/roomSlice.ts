import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { roomService } from '../../services/roomService'
import type { Room, RoomPaginationResponse, RoomSearchParams } from '../../types'

interface RoomState {
    items: Room[]
    total: number
    loading: boolean
    error: string | null
}

const initialState: RoomState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
}

export const fetchRoomsThunk = createAsyncThunk<RoomPaginationResponse, RoomSearchParams | undefined>(
    'room/list',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await roomService.list(params)
            return data
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(err.response?.data?.message || 'Fetch rooms failed')
        }
    },
)

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomsThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRoomsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.content.data
                state.total = action.payload.content.totalRow
            })
            .addCase(fetchRoomsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default roomSlice.reducer
