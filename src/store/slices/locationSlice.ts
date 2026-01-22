import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { locationService } from '../../services/locationService'
import type { Location, LocationResponse } from '../../types'

interface LocationState {
    items: Location[]
    loading: boolean
    error: string | null
}

const initialState: LocationState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchLocationsThunk = createAsyncThunk<LocationResponse>(
    'location/list',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await locationService.list()
            return data
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } }
            return rejectWithValue(err.response?.data?.message || 'Fetch locations failed')
        }
    },
)

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocationsThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchLocationsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload.content
            })
            .addCase(fetchLocationsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export default locationSlice.reducer
