import { useState, useMemo } from 'react'
import { Search, Plus } from 'lucide-react'
import Button from '../../../components/common/Button'
import Pagination from '../../../components/common/Pagination'
import { LocationTable } from './_components/LocationTable'
import {
    LocationModal,
    type LocationFormData,
} from './_components/LocationModal'
import { useLocationList } from '../../../hooks/apiHooks'
import { locationService } from '../../../services/locationService'
import type {
    Location,
    LocationCreateRequest,
    LocationUpdateRequest,
} from '../../../types/location'
import type { AuthState } from '../../../store/slices/authSlice'
import { useSelector } from 'react-redux'

interface RootState {
    auth: AuthState
}

export default function LocationManagement() {
    const accessToken = useSelector((state: RootState) => state.auth.token)
    const { data: locations = [] } = useLocationList({ skipLoading: false })

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const [modalState, setModalState] = useState<{
        open: boolean
        location: Location | null
    }>({
        open: false,
        location: null,
    })

    const filteredLocations = useMemo(() => {
        return locations.filter(
            (loc: Location) =>
                loc.tenViTri.toLowerCase().includes(searchTerm.toLowerCase()) ||
                loc.tinhThanh.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [locations, searchTerm])

    const paginatedLocations = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return filteredLocations.slice(start, start + pageSize)
    }, [filteredLocations, currentPage, pageSize])

    const totalPages = Math.ceil(filteredLocations.length / pageSize)

    const handleSaveLocation = async (data: LocationFormData) => {
        const token = accessToken || ''
        try {
            if (modalState.location) {
                const updatePayload: LocationUpdateRequest = {
                    id: modalState.location.id,
                    tenViTri: data.tenViTri,
                    tinhThanh: data.tinhThanh,
                    quocGia: data.quocGia,
                    hinhAnh: data.hinhAnh,
                }

                await locationService.update(updatePayload, token)

                if (data.file) {
                    const formData = new FormData()
                    formData.append('formFile', data.file)
                    await locationService.uploadImage(
                        formData,
                        modalState.location.id,
                        token,
                    )
                }
            } else {
                const createPayload: LocationCreateRequest = {
                    tenViTri: data.tenViTri,
                    tinhThanh: data.tinhThanh,
                    quocGia: data.quocGia,
                    hinhAnh: '',
                }
                const response = await locationService.create(
                    createPayload,
                    token,
                )

                if (data.file && response.data.content.id) {
                    const formData = new FormData()
                    formData.append('formFile', data.file)
                    await locationService.uploadImage(
                        formData,
                        response.data.content.id,
                        token,
                    )
                }
            }
            window.location.reload()
        } catch (error) {
            alert('Action failed')
            console.log(error)
        }
    }

    const handleDeleteLocation = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this location?'))
            return

        try {
            const token = accessToken || ''
            await locationService.delete(id, token)
            window.location.reload()
        } catch (error) {
            console.error(error)
            alert('Delete failed')
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container mx-auto px-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                        Location Management
                    </h1>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div className='relative flex-1 max-w-md'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                                placeholder='Search locations...'
                                className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white'
                            />
                        </div>
                        <Button
                            onClick={() =>
                                setModalState({ open: true, location: null })
                            }
                            className='flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white'
                        >
                            <Plus className='w-5 h-5' />
                            Add Location
                        </Button>
                    </div>
                </div>

                <LocationTable
                    locations={paginatedLocations}
                    onEdit={(location) =>
                        setModalState({ open: true, location })
                    }
                    onDelete={handleDeleteLocation}
                />

                {totalPages > 0 && (
                    <div className='mt-6'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                <LocationModal
                    // Key này quan trọng để Fix lỗi ESLint setState in Effect
                    key={
                        modalState.location
                            ? modalState.location.id
                            : 'create-location'
                    }
                    isOpen={modalState.open}
                    location={modalState.location}
                    onClose={() =>
                        setModalState({ open: false, location: null })
                    }
                    onSave={handleSaveLocation}
                />
            </div>
        </div>
    )
}
