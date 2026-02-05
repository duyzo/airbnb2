import { useState, useEffect } from 'react'
import { roomService } from '../../../services/roomService'
import type { Room, RoomByIdResponse } from '../../../types'

interface UseRoomListByIdOptions {
    id: number
    skipLoading?: boolean
}

export const useRoomById = ({
    id,
    skipLoading = false,
}: UseRoomListByIdOptions) => {
    const [data, setData] = useState<Room>(null as unknown as Room)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoomsById = async () => {
            try {
                setLoading(true)
                const response = await roomService.byId(id, {
                    skipLoading,
                })

                const dataRes: RoomByIdResponse = response.data

                setData(dataRes.content)
            } catch (err) {
                setError(
                    'Something went wrong while fetching rooms by id.',
                )
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchRoomsById()
        }
    }, [id, skipLoading])

    return {
        data,
        loading,
        error,
    }
}
