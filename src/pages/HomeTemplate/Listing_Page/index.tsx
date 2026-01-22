import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Filter, Grid, List, Star, Users, Home, Bed, Bath, Wifi, Car, Tv, Wind, Waves } from 'lucide-react'
import Card from '../../../components/common/Card'
import Pagination from '../../../components/common/Pagination'
import Select from '../../../components/common/Select'
import Badge from '../../../components/common/Badge'
import type { Room } from '../../../types'

export default function ListingPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const locationId = searchParams.get('location')

    const [rooms, setRooms] = useState<Room[]>([])
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(5)
    const [showFilters, setShowFilters] = useState(false)

    // Filters
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
    const [minGuests, setMinGuests] = useState(1)
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

    useEffect(() => {
        // TODO: Fetch rooms from API based on locationId and filters
        // Mock data
        const mockRooms: Room[] = Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            tenPhong: `Beautiful ${i % 3 === 0 ? 'Villa' : i % 3 === 1 ? 'Apartment' : 'Studio'} #${i + 1}`,
            khach: Math.floor(Math.random() * 6) + 2,
            phongNgu: Math.floor(Math.random() * 4) + 1,
            giuong: Math.floor(Math.random() * 5) + 1,
            phongTam: Math.floor(Math.random() * 3) + 1,
            moTa: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            giaTien: Math.floor(Math.random() * 300) + 50,
            mayGiat: Math.random() > 0.5,
            banLa: Math.random() > 0.5,
            tivi: Math.random() > 0.3,
            dieuHoa: Math.random() > 0.4,
            wifi: Math.random() > 0.2,
            bep: Math.random() > 0.5,
            doXe: Math.random() > 0.6,
            hoBoi: Math.random() > 0.7,
            banUi: Math.random() > 0.8,
            maViTri: Number(locationId) || 1,
            hinhAnh: `https://images.unsplash.com/photo-${1560184897 + i}742-33c89424de2d?w=800`,
        }))
        setRooms(mockRooms)
    }, [locationId, currentPage])

    const handleRoomClick = (roomId: number) => {
        navigate(`/room/${roomId}`)
    }

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
        )
    }

    const amenitiesList = [
        { key: 'wifi', label: 'WiFi', icon: Wifi },
        { key: 'dieuHoa', label: 'Air Conditioning', icon: Wind },
        { key: 'tivi', label: 'TV', icon: Tv },
        { key: 'doXe', label: 'Parking', icon: Car },
        { key: 'hoBoi', label: 'Pool', icon: Waves },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Available Properties</h1>
                        <p className="text-gray-600 mt-1">
                            {rooms.length} properties found
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                        <div className="flex border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 ${viewMode === 'grid' ? 'bg-rose-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 ${viewMode === 'list' ? 'bg-rose-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                        <Select
                            options={[
                                { value: 'popular', label: 'Most Popular' },
                                { value: 'price-asc', label: 'Price: Low to High' },
                                { value: 'price-desc', label: 'Price: High to Low' },
                                { value: 'rating', label: 'Highest Rated' },
                            ]}
                            defaultValue="popular"
                            className="min-w-45"
                        />
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <Card className="mb-6 p-6">
                        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Price Range</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="w-24 px-3 py-2 border rounded"
                                        placeholder="Min"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-24 px-3 py-2 border rounded"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Minimum Guests</label>
                                <input
                                    type="number"
                                    value={minGuests}
                                    onChange={(e) => setMinGuests(Number(e.target.value))}
                                    min="1"
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Amenities</label>
                                <div className="flex flex-wrap gap-2">
                                    {amenitiesList.map(({ key, label, icon: Icon }) => (
                                        <button
                                            key={key}
                                            onClick={() => toggleAmenity(key)}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border ${selectedAmenities.includes(key)
                                                ? 'bg-rose-500 text-white border-rose-500'
                                                : 'bg-white border-gray-300 hover:border-rose-300'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Rooms Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {rooms.map((room) => (
                            <Card key={room.id} hover onClick={() => handleRoomClick(room.id)}>
                                <div className="relative h-48">
                                    <img
                                        src={room.hinhAnh}
                                        alt={room.tenPhong}
                                        className="w-full h-full object-cover"
                                    />
                                    <Badge className="absolute top-3 right-3" variant="info">
                                        ${room.giaTien}/night
                                    </Badge>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                        {room.tenPhong}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{room.khach}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Home className="w-4 h-4" />
                                            <span>{room.phongNgu}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bed className="w-4 h-4" />
                                            <span>{room.giuong}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bath className="w-4 h-4" />
                                            <span>{room.phongTam}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-medium">4.8</span>
                                            <span className="text-xs text-gray-500">(120)</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {room.wifi && <Wifi className="w-4 h-4 text-gray-400" />}
                                            {room.hoBoi && <Waves className="w-4 h-4 text-gray-400" />}
                                            {room.doXe && <Car className="w-4 h-4 text-gray-400" />}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {rooms.map((room) => (
                            <Card
                                key={room.id}
                                hover
                                onClick={() => handleRoomClick(room.id)}
                                className="flex flex-col md:flex-row"
                            >
                                <div className="md:w-80 h-48 md:h-auto flex-shrink-0">
                                    <img
                                        src={room.hinhAnh}
                                        alt={room.tenPhong}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-xl mb-2">{room.tenPhong}</h3>
                                            <div className="flex items-center gap-1 mb-2">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">4.8</span>
                                                <span className="text-xs text-gray-500">(120 reviews)</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900">
                                                ${room.giaTien}
                                            </div>
                                            <div className="text-sm text-gray-600">per night</div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{room.moTa}</p>
                                    <div className="flex items-center gap-6 text-sm text-gray-700 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5" />
                                            <span>{room.khach} guests</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Home className="w-5 h-5" />
                                            <span>{room.phongNgu} bedrooms</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Bed className="w-5 h-5" />
                                            <span>{room.giuong} beds</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Bath className="w-5 h-5" />
                                            <span>{room.phongTam} baths</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {room.wifi && <Badge variant="default">WiFi</Badge>}
                                        {room.dieuHoa && <Badge variant="default">AC</Badge>}
                                        {room.tivi && <Badge variant="default">TV</Badge>}
                                        {room.bep && <Badge variant="default">Kitchen</Badge>}
                                        {room.doXe && <Badge variant="default">Parking</Badge>}
                                        {room.hoBoi && <Badge variant="default">Pool</Badge>}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}
