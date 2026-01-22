import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, TrendingUp } from 'lucide-react'
import SearchBar from '../../../components/common/SearchBar'
import Card from '../../../components/common/Card'
import type { Location, Room } from '../../../types'

export default function Home() {
    const navigate = useNavigate()
    const [locations, setLocations] = useState<Location[]>([])
    const [featuredRooms, setFeaturedRooms] = useState<Room[]>([])

    // TODO: Fetch data from API when available
    useEffect(() => {
        // Mock data for now
        setLocations([
            {
                id: 1,
                tenViTri: 'Hồ Chí Minh',
                tinhThanh: 'TP. HCM',
                quocGia: 'Việt Nam',
                hinhAnh: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800',
            },
            {
                id: 2,
                tenViTri: 'Hà Nội',
                tinhThanh: 'Hà Nội',
                quocGia: 'Việt Nam',
                hinhAnh: 'https://images.unsplash.com/photo-1564410267141-f0928e0b2f2e?w=800',
            },
            {
                id: 3,
                tenViTri: 'Đà Nẵng',
                tinhThanh: 'Đà Nẵng',
                quocGia: 'Việt Nam',
                hinhAnh: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
            },
            {
                id: 4,
                tenViTri: 'Nha Trang',
                tinhThanh: 'Khánh Hòa',
                quocGia: 'Việt Nam',
                hinhAnh: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
            },
        ])

        setFeaturedRooms([
            {
                id: 1,
                tenPhong: 'Luxury Villa with Pool',
                khach: 6,
                phongNgu: 3,
                giuong: 4,
                phongTam: 2,
                moTa: 'Beautiful villa with stunning views',
                giaTien: 150,
                mayGiat: true,
                banLa: true,
                tivi: true,
                dieuHoa: true,
                wifi: true,
                bep: true,
                doXe: true,
                hoBoi: true,
                banUi: true,
                maViTri: 1,
                hinhAnh: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
            },
            {
                id: 2,
                tenPhong: 'Cozy Downtown Apartment',
                khach: 4,
                phongNgu: 2,
                giuong: 2,
                phongTam: 1,
                moTa: 'Modern apartment in city center',
                giaTien: 80,
                mayGiat: true,
                banLa: false,
                tivi: true,
                dieuHoa: true,
                wifi: true,
                bep: true,
                doXe: true,
                hoBoi: false,
                banUi: false,
                maViTri: 2,
                hinhAnh: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
            },
            {
                id: 3,
                tenPhong: 'Beachfront Bungalow',
                khach: 2,
                phongNgu: 1,
                giuong: 1,
                phongTam: 1,
                moTa: 'Romantic getaway by the beach',
                giaTien: 120,
                mayGiat: false,
                banLa: false,
                tivi: true,
                dieuHoa: true,
                wifi: true,
                bep: false,
                doXe: false,
                hoBoi: false,
                banUi: false,
                maViTri: 3,
                hinhAnh: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
            },
            {
                id: 4,
                tenPhong: 'Mountain View Cabin',
                khach: 8,
                phongNgu: 4,
                giuong: 5,
                phongTam: 3,
                moTa: 'Spacious cabin with mountain views',
                giaTien: 200,
                mayGiat: true,
                banLa: true,
                tivi: true,
                dieuHoa: true,
                wifi: true,
                bep: true,
                doXe: true,
                hoBoi: false,
                banUi: true,
                maViTri: 4,
                hinhAnh: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800',
            },
        ])
    }, [])

    const handleSearch = (params: { location: string; checkIn: string; checkOut: string; guests: number }) => {
        // TODO: Navigate to listing page with search params
        console.log('Search params:', params)
        navigate('/listings')
    }

    const handleLocationClick = (locationId: number) => {
        navigate(`/listings?location=${locationId}`)
    }

    const handleRoomClick = (roomId: number) => {
        navigate(`/room/${roomId}`)
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-125 bg-cover bg-center"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600)',
                }}
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
                        Find your next stay
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-center">
                        Discover amazing places at exclusive deals
                    </p>
                    <div className="w-full max-w-5xl">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex items-center gap-2 mb-8">
                    <TrendingUp className="w-6 h-6 text-rose-500" />
                    <h2 className="text-3xl font-bold text-gray-800">Popular Destinations</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {locations.map((location) => (
                        <Card
                            key={location.id}
                            hover
                            onClick={() => handleLocationClick(location.id)}
                        >
                            <div className="relative h-48">
                                <img
                                    src={location.hinhAnh}
                                    alt={location.tenViTri}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-4 text-white">
                                    <div className="flex items-center gap-1 mb-1">
                                        <MapPin className="w-4 h-4" />
                                        <h3 className="font-semibold text-lg">{location.tenViTri}</h3>
                                    </div>
                                    <p className="text-sm opacity-90">
                                        {location.tinhThanh}, {location.quocGia}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Featured Stays */}
            <section className="container mx-auto px-4 py-16 bg-gray-50">
                <div className="flex items-center gap-2 mb-8">
                    <Star className="w-6 h-6 text-rose-500 fill-rose-500" />
                    <h2 className="text-3xl font-bold text-gray-800">Featured Stays</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredRooms.map((room) => (
                        <Card key={room.id} hover onClick={() => handleRoomClick(room.id)}>
                            <div className="relative h-48">
                                <img
                                    src={room.hinhAnh}
                                    alt={room.tenPhong}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                    {room.tenPhong}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {room.khach} guests · {room.phongNgu} bedrooms · {room.giuong} beds
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">4.8</span>
                                    </div>
                                    <div>
                                        <span className="text-lg font-bold text-gray-900">
                                            ${room.giaTien}
                                        </span>
                                        <span className="text-sm text-gray-600"> / night</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="bg-linear-to-r from-rose-500 to-pink-600 rounded-3xl p-12 text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to start your journey?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of travelers finding their perfect stay
                    </p>
                    <button
                        onClick={() => navigate('/listings')}
                        className="bg-white text-rose-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                    >
                        Explore All Listings
                    </button>
                </div>
            </section>
        </div>
    )
}
