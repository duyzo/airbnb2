// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, TrendingUp } from 'lucide-react'
import SearchBar from '../../../components/common/SearchBar'
import Card from '../../../components/common/Card'
import {
    useLocationListPaging,
    useRoomListPaging,
} from '../../../hooks/apiHooks'

type SearchParams = {
    location: string | number
    checkIn: string
    checkOut: string
    guests: number
}

export default function Home() {
    const navigate = useNavigate()
    const { data: locations } = useLocationListPaging({
        initialConfig: { pageIndex: 1, pageSize: 4 },
        skipLoading: true,
    })
    const { data: featuredRooms } = useRoomListPaging({
        initialConfig: { pageIndex: 1, pageSize: 4 },
        skipLoading: true,
    })
    
    const handleSearch = (params: SearchParams) => {
        navigate('/listings?' + `location=${params.location}&checkIn=${params.checkIn}&checkOut=${params.checkOut}&guests=${params.guests}`)
    }

    const handleLocationClick = (locationId: number) => {
        navigate(`/listings?location=${locationId}`)
    }

    const handleRoomClick = (roomId: number) => {
        navigate(`/room/${roomId}`)
    }

    return (
        <div className='min-h-screen'>
            {/* Hero Section */}
            <section
                className='relative h-125 bg-cover bg-center'
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600)',
                }}
            >
                <div className='absolute inset-0 flex flex-col items-center justify-center text-white px-4'>
                    <h1 className='text-5xl md:text-6xl font-bold mb-4 text-center'>
                        Find your next stay
                    </h1>
                    <p className='text-xl md:text-2xl mb-8 text-center'>
                        Discover amazing places at exclusive deals
                    </p>
                    <div className='w-full max-w-5xl'>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className='container mx-auto px-4 py-16'>
                <div className='flex items-center gap-2 mb-8'>
                    <TrendingUp className='w-6 h-6 text-rose-500' />
                    <h2 className='text-3xl font-bold text-gray-800'>
                        Popular Destinations
                    </h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {locations.map((location) => (
                        <Card
                            key={location.id}
                            hover
                            onClick={() => handleLocationClick(location.id)}
                        >
                            <div className='relative h-48'>
                                <img
                                    src={location.hinhAnh}
                                    alt={location.tenViTri}
                                    className='w-full h-full object-cover'
                                />
                                <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent' />
                                <div className='absolute bottom-0 left-0 p-4 text-white'>
                                    <div className='flex items-center gap-1 mb-1'>
                                        <MapPin className='w-4 h-4' />
                                        <h3 className='font-semibold text-lg'>
                                            {location.tenViTri}
                                        </h3>
                                    </div>
                                    <p className='text-sm opacity-90'>
                                        {location.tinhThanh}, {location.quocGia}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Featured Stays */}
            <section className='container mx-auto px-4 py-16 bg-gray-50'>
                <div className='flex items-center gap-2 mb-8'>
                    <Star className='w-6 h-6 text-rose-500 fill-rose-500' />
                    <h2 className='text-3xl font-bold text-gray-800'>
                        Featured Stays
                    </h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {featuredRooms.map((room) => (
                        <Card
                            key={room.id}
                            hover
                            onClick={() => handleRoomClick(room.id)}
                        >
                            <div className='relative h-48'>
                                <img
                                    src={room.hinhAnh}
                                    alt={room.tenPhong}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='p-4'>
                                <h3 className='font-semibold text-lg mb-2 line-clamp-1'>
                                    {room.tenPhong}
                                </h3>
                                <p className='text-sm text-gray-600 mb-2'>
                                    {room.khach} guests · {room.phongNgu}{' '}
                                    bedrooms · {room.giuong} beds
                                </p>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-1'>
                                        <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                                        <span className='text-sm font-medium'>
                                            4.8
                                        </span>
                                    </div>
                                    <div>
                                        <span className='text-lg font-bold text-gray-900'>
                                            ${room.giaTien}
                                        </span>
                                        <span className='text-sm text-gray-600'>
                                            {' '}
                                            / night
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className='container mx-auto px-4 py-16'>
                <div className='bg-linear-to-r from-rose-500 to-pink-600 rounded-3xl p-12 text-white text-center'>
                    <h2 className='text-4xl font-bold mb-4'>
                        Ready to start your journey?
                    </h2>
                    <p className='text-xl mb-8 opacity-90'>
                        Join thousands of travelers finding their perfect stay
                    </p>
                    <button
                        onClick={() => navigate('/listings')}
                        className='bg-white text-rose-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors'
                    >
                        Explore All Listings
                    </button>
                </div>
            </section>
        </div>
    )
}
