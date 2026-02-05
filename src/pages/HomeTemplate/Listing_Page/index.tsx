import { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Loader2,
    AlertCircle,
    Users,
    Home,
    Waves,
    Heart,
    Star,
} from 'lucide-react'
import { useRoomList } from '../../../hooks/apiHooks'
import FilterModal from './_components/FilterModal'
import CompactFilterBar from './_components/CompactFilterBar'
import Pagination from '../../../components/common/Pagination'
import type { Room } from '../../../types'

export default function ListingPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const { data: allRooms, loading, error } = useRoomList()

    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const currentPage = Number(searchParams.get('page')) || 1
    const itemsPerPage = 8

    const filteredRooms = useMemo(() => {
        if (!allRooms) return []
        return allRooms.filter((room: Room) => {
            const locationId = searchParams.get('location')
            if (locationId && room.maViTri !== Number(locationId)) return false

            const minPrice = Number(searchParams.get('minPrice')) || 0
            const maxPrice = Number(searchParams.get('maxPrice')) || 10000
            if (room.giaTien < minPrice || room.giaTien > maxPrice) return false

            const reqRooms = Number(searchParams.get('rooms')) || 0
            const reqBeds = Number(searchParams.get('beds')) || 0
            const reqBaths = Number(searchParams.get('bathrooms')) || 0
            const reqGuests = Number(searchParams.get('guests')) || 0

            if (room.phongNgu < reqRooms) return false
            if (room.giuong < reqBeds) return false
            if (room.phongTam < reqBaths) return false
            if (reqGuests > 0 && room.khach < reqGuests) return false

            const amenitiesParam = searchParams.get('amenities')
            if (amenitiesParam) {
                const reqAmenities = amenitiesParam.split(',')
                const hasAll = reqAmenities.every(
                    (key) => (room as any)[key] === true,
                )
                if (!hasAll) return false
            }
            return true
        })
    }, [allRooms, searchParams])

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage)
    const displayedRooms = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return filteredRooms.slice(start, start + itemsPerPage)
    }, [filteredRooms, currentPage])

    if (loading)
        return (
            <div className='min-h-screen flex flex-col items-center justify-center space-y-4'>
                <Loader2 className='w-10 h-10 animate-spin text-rose-500' />
                <p className='text-gray-500 font-medium'>
                    Finding the best accommodations...
                </p>
            </div>
        )
    if (error)
        return (
            <div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
                <AlertCircle className='w-12 h-12 text-rose-500 mb-4' />
                <h2 className='text-xl font-bold text-gray-800'>Error</h2>
                <p className='text-gray-600 mt-2'>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className='mt-6 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-black'
                >
                    Reload
                </button>
            </div>
        )

    return (
        <div className='min-h-screen bg-white'>
            <div className='sticky top-0 z-40 bg-white border-b py-3 px-2 md:px-4 shadow-sm'>
                <CompactFilterBar onOpenFilter={() => setIsFilterOpen(true)} />
            </div>

            <div className='container mx-auto px-4 py-6 md:py-8'>
                <div className='mb-6'>
                    <h1 className='text-lg md:text-xl font-semibold text-gray-800'>
                        {filteredRooms.length > 0
                            ? `Found ${filteredRooms.length} accommodations`
                            : 'No results found'}
                    </h1>
                </div>
                {filteredRooms.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 text-center'>
                        <h3 className='text-lg font-medium text-gray-900'>
                            No rooms found
                        </h3>
                        <p className='text-gray-500 max-w-md mt-2'>
                            Try adjusting your filters.
                        </p>
                        <button
                            onClick={() =>
                                setSearchParams(new URLSearchParams())
                            }
                            className='mt-6 text-rose-500 font-semibold hover:underline'
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
                        {displayedRooms.map((room) => (
                            <div
                                key={room.id}
                                className='group relative flex flex-col gap-3 cursor-pointer'
                                onClick={() => navigate(`/room/${room.id}`)}
                            >
                                <div className='relative aspect-20/19 sm:aspect-square w-full overflow-hidden rounded-xl bg-gray-200'>
                                    <img
                                        src={room.hinhAnh}
                                        alt={room.tenPhong}
                                        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                                        onError={(e) => {
                                            ;(
                                                e.target as HTMLImageElement
                                            ).src =
                                                'https://via.placeholder.com/400x300?text=Room'
                                        }}
                                    />

                                    <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                                    <button
                                        className='absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 transition-colors z-10'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log('Like room', room.id)
                                        }}
                                    >
                                        <Heart className='w-6 h-6 text-white drop-shadow-md hover:fill-rose-500 hover:text-rose-500 transition-colors' />
                                    </button>

                                    <div className='absolute top-3 left-3 flex flex-col gap-2'>
                                        {room.hoBoi && (
                                            <span className='inline-flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-md px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm'>
                                                <Waves className='w-3.5 h-3.5 text-blue-500' />
                                                Hồ bơi
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <div className='flex justify-between items-start gap-2'>
                                        <h3
                                            className='font-semibold text-gray-900 truncate text-base leading-tight flex-1'
                                            title={room.tenPhong}
                                        >
                                            {room.tenPhong}
                                        </h3>
                                        <div className='flex items-center gap-1 shrink-0 text-sm'>
                                            <Star className='w-3.5 h-3.5 fill-black text-black' />
                                            <span className='font-medium'>
                                                4.8
                                            </span>
                                        </div>
                                    </div>

                                    <p className='text-gray-500 text-sm truncate'>
                                        {room.moTa}
                                    </p>

                                    <div className='flex items-center gap-3 text-sm text-gray-500 mt-1'>
                                        <span className='flex items-center gap-1.5'>
                                            <Users className='w-4 h-4' />{' '}
                                            {room.khach} khách
                                        </span>
                                        <span className='w-0.5 h-0.5 rounded-full bg-gray-300' />
                                        <span className='flex items-center gap-1.5'>
                                            <Home className='w-4 h-4' />{' '}
                                            {room.phongNgu} phòng
                                        </span>
                                    </div>

                                    <div className='flex items-baseline gap-1 mt-2'>
                                        <span className='font-bold text-gray-900 text-lg'>
                                            ${room.giaTien}
                                        </span>
                                        <span className='text-gray-500 font-normal text-sm'>
                                            đêm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && totalPages > 1 && (
                    <div className='mt-12 flex justify-center pb-8'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                const newParams = new URLSearchParams(
                                    searchParams,
                                )
                                newParams.set('page', page.toString())
                                setSearchParams(newParams)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                        />
                    </div>
                )}
            </div>
            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </div>
    )
}
