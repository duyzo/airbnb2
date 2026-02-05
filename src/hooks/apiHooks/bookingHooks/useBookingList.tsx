import { useState, useEffect } from 'react'
import type { Booking, BookingListResponse } from '../../../types'
import { bookingService } from '../../../services/bookingService'

export const useBookingList = (skipLoading = false) => {
    const [data, setData] = useState<Booking[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await bookingService.list({ skipLoading })
                const dataRes: BookingListResponse = response.data
                setData(dataRes.content)
            } catch (err: unknown) {
                setError('Something went wrong while fetching bookings.')
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [skipLoading])

    return { data, loading, error }
}
