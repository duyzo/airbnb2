import { useState, useEffect } from 'react'
import { roomService } from '../../../services/roomService'
import type { Room } from '../../../types'

interface UseRoomListByLocationOptions {
    locationId: number
    skipLoading?: boolean
}

export const useRoomListByLocation = ({
    locationId,
    skipLoading = false,
}: UseRoomListByLocationOptions) => {
    const [data, setData] = useState<Room[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoomsByLocation = async () => {
            try {
                setLoading(true)
                const response = await roomService.byLocation(locationId, {
                    skipLoading,
                })

                setData(response.data.content)
            } catch (err) {
                setError(
                    'Something went wrong while fetching rooms by location.',
                )
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (locationId) {
            fetchRoomsByLocation()
        }
    }, [locationId, skipLoading])

    return {
        data,
        loading,
        error,
    }
}
