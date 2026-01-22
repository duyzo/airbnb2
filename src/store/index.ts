import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import roomReducer from './slices/roomSlice'
import locationReducer from './slices/locationSlice'
import bookingReducer from './slices/bookingSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        room: roomReducer,
        location: locationReducer,
        booking: bookingReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
