import { createSlice } from '@reduxjs/toolkit'

export interface LoadingState {
    isLoading: boolean
    requestCount: number
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
        requestCount: 0,
    },
    reducers: {
        startLoading: (state) => {
            state.requestCount += 1
            state.isLoading = true
        },
        stopLoading: (state) => {
            state.requestCount -= 1
            if (state.requestCount <= 0) {
                state.requestCount = 0
                state.isLoading = false
            }
        },
    },
})

export const { startLoading, stopLoading } = loadingSlice.actions
export default loadingSlice.reducer
