import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import roomReducer from './slices/roomSlice'
import locationReducer from './slices/locationSlice'
import bookingReducer from './slices/bookingSlice'
import loadingReducer from './slices/loadingSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
        location: locationReducer,
        booking: bookingReducer,
        loading: loadingReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
