import { useState, useEffect } from 'react'
import type { Room, RoomListResponse } from '../../../types'
import { roomService } from '../../../services/roomService'

export const useRoomList = (skipLoading = false) => {
    const [data, setData] = useState<Room[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await roomService.list({ skipLoading })
                const dataRes: RoomListResponse = response.data
                setData(dataRes.content)
            } catch (err: unknown) {
                setError('Something went wrong while fetching rooms.')
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [skipLoading])

    return { data, loading, error }
}
