import { useState, useEffect } from 'react'
import { locationService } from '../../../services/locationService'
import type { LocationResponse, Location } from '../../../types'

interface UseLocationListOptions {
    skipLoading?: boolean
}

export const useLocationList = (options?: UseLocationListOptions) => {
    const { skipLoading = false } = options || {}
    const [data, setData] = useState<Location[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await locationService.list({ skipLoading })
                const dataRes: LocationResponse = response.data
                setData(dataRes.content)
            } catch (err: unknown) {
                setError('Something went wrong while fetching locations.')
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [skipLoading])

    return { data, loading, error }
}
