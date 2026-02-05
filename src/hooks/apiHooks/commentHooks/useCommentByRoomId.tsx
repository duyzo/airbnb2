import { useState, useEffect } from 'react'
import { commentService } from '../../../services/commentService'
import type { Comment } from '../../../types'

interface UseCommentByRoomIdOptions {
    roomId: number
    skipLoading?: boolean
}

export const useCommentByRoomId = ({
    roomId,
    skipLoading = false,
}: UseCommentByRoomIdOptions) => {
    const [data, setData] = useState<Comment[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCommentsByRoomId = async () => {
            try {
                setLoading(true)
                const response = await commentService.byRoomId(roomId, {
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

        if (roomId) {
            fetchCommentsByRoomId()
        }
    }, [roomId, skipLoading])

    return {
        data,
        loading,
        error,
    }
}
