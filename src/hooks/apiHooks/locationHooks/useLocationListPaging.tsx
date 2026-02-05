import { useState, useEffect } from 'react'
import { locationService } from '../../../services/locationService'
import type { Location } from '../../../types'

interface PaginationState {
    pageIndex: number
    pageSize: number
    totalRow: number
}

interface UseLocationPagingOptions {
    initialConfig?: {
        pageIndex: number
        pageSize: number
    }
    skipLoading?: boolean
}

export const useLocationListPaging = (options?: UseLocationPagingOptions) => {
    const {
        initialConfig = { pageIndex: 1, pageSize: 10 },
        skipLoading = false,
    } = options || {}
    const [data, setData] = useState<Location[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [keyword, setKeyword] = useState<string>('')
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: initialConfig.pageIndex,
        pageSize: initialConfig.pageSize,
        totalRow: 0,
    })

    useEffect(() => {
        const fetchPaging = async () => {
            try {
                setLoading(true)
                const response = await locationService.listPaging(
                    {
                        pageIndex: pagination.pageIndex,
                        pageSize: pagination.pageSize,
                        keyword,
                    },
                    { skipLoading },
                )

                const { data: listData, totalRow } = response.data.content

                setData(listData)
                setPagination((prev) => ({ ...prev, totalRow }))
            } catch (err) {
                setError('Something went wrong while fetching paged locations.')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchPaging()
    }, [pagination.pageIndex, pagination.pageSize, keyword, skipLoading])

    const handlePageChange = (newPage: number) => {
        setPagination((prev) => ({ ...prev, pageIndex: newPage }))
    }

    const handleSearch = (newKeyword: string) => {
        setKeyword(newKeyword)
        setPagination((prev) => ({ ...prev, pageIndex: 1 }))
    }

    return {
        data,
        loading,
        error,
        pagination,
        handlePageChange,
        handleSearch,
    }
}
