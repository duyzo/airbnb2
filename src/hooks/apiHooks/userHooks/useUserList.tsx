import { useState, useEffect } from 'react'
import { userService } from '../../../services/userService'
import type { User } from '../../../types'

interface UseUserListOptions {
    skipLoading?: boolean
}

interface UserListResponse {
    statusCode: number
    content: User[]
    dateTime?: string
}

export const useUserList = (options?: UseUserListOptions) => {
    const { skipLoading = false } = options || {}
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.list({ skipLoading })
                const dataRes: UserListResponse = response.data
                setData(dataRes.content)
            } catch (err: unknown) {
                setError('Something went wrong while fetching users.')
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [skipLoading])

    return { data, loading, error }
}
