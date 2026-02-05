import { useState, useEffect } from 'react'
import { bookingService } from '../../../services/bookingService'
import type { Booking } from '../../../types'

interface UseBookingListByUserIdOptions {
    userId: number
    skipLoading?: boolean
}

export const useBookingListByUserId = ({
    userId,
    skipLoading = false,
}: UseBookingListByUserIdOptions) => {
    const [data, setData] = useState<Booking[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBookingsByUserId = async () => {
            try {
                setLoading(true)
                const response = await bookingService.byUser(userId, {
                    skipLoading,
                })
                
                setData(response.data.content)
            } catch (err) {
                setError(
                    'Something went wrong while fetching comments by room id.',
                )
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            fetchBookingsByUserId()
        }
    }, [userId, skipLoading])

    return {
        data,
        loading,
        error,
    }
}
