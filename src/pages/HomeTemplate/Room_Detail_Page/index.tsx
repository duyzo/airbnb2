import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Star,
    Users,
    Home,
    Bed,
    Bath,
    MapPin,
    Wifi,
    Tv,
    Wind,
    Car,
    Waves,
    Utensils,
    Shirt,
    Calendar,
    Send,
} from 'lucide-react'
import Card from '../../../components/common/Card'
import Button from '../../../components/common/Button'
import RatingStars from '../../../components/common/RatingStars'
import ImageGallery from '../../../components/common/ImageGallery'
import Badge from '../../../components/common/Badge'
import type { Room, Comment } from '../../../types'

export default function RoomDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [room, setRoom] = useState<Room | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [showGallery, setShowGallery] = useState(false)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)
    const [newComment, setNewComment] = useState('')
    const [newRating, setNewRating] = useState(5)

    const images = [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
        'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1200',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200',
    ]

    useEffect(() => {
        // TODO: Fetch room details and comments from API
        const mockRoom: Room = {
            id: Number(id),
            tenPhong: 'Luxury Beachfront Villa with Pool',
            khach: 8,
            phongNgu: 4,
            giuong: 5,
            phongTam: 3,
            moTa: 'Experience paradise in this stunning beachfront villa. Wake up to breathtaking ocean views, enjoy your private infinity pool, and relax in spacious, luxuriously appointed rooms. Perfect for families or groups seeking an unforgettable tropical getaway.',
            giaTien: 350,
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
            hinhAnh: images[0],
        }

        const mockComments: Comment[] = [
            {
                id: 1,
                maPhong: Number(id),
                maNguoiBinhLuan: 1,
                ngayBinhLuan: '2024-01-15',
                noiDung: 'Absolutely amazing stay! The villa exceeded all our expectations.',
                saoBinhLuan: 5,
            },
            {
                id: 2,
                maPhong: Number(id),
                maNguoiBinhLuan: 2,
                ngayBinhLuan: '2024-01-10',
                noiDung: 'Beautiful location and great amenities. Highly recommend!',
                saoBinhLuan: 5,
            },
        ]

        setRoom(mockRoom)
        setComments(mockComments)
    }, [id])

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault()
        if (!checkIn || !checkOut) {
            alert('Please select check-in and check-out dates')
            return
        }
        // TODO: Call booking API
        console.log({ roomId: id, checkIn, checkOut, guests })
        alert('Booking request sent!')
        navigate('/my-bookings')
    }

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return
        // TODO: Call comment API
        const comment: Comment = {
            id: Date.now(),
            maPhong: Number(id),
            maNguoiBinhLuan: 1,
            ngayBinhLuan: new Date().toISOString().split('T')[0],
            noiDung: newComment,
            saoBinhLuan: newRating,
        }
        setComments([comment, ...comments])
        setNewComment('')
        setNewRating(5)
    }

    if (!room) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>
    }

    const amenities = [
        { key: 'wifi', label: 'WiFi', icon: Wifi, value: room.wifi },
        { key: 'dieuHoa', label: 'Air Conditioning', icon: Wind, value: room.dieuHoa },
        { key: 'tivi', label: 'TV', icon: Tv, value: room.tivi },
        { key: 'bep', label: 'Kitchen', icon: Utensils, value: room.bep },
        { key: 'doXe', label: 'Parking', icon: Car, value: room.doXe },
        { key: 'hoBoi', label: 'Pool', icon: Waves, value: room.hoBoi },
        { key: 'mayGiat', label: 'Washing Machine', icon: Shirt, value: room.mayGiat },
    ]

    const nights =
        checkIn && checkOut
            ? Math.ceil(
                (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
            )
            : 0
    const totalPrice = nights * room.giaTien

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Image Gallery Modal */}
            <ImageGallery images={images} open={showGallery} onClose={() => setShowGallery(false)} />

            {/* Images Grid */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden max-h-125">
                    <div
                        className="col-span-2 row-span-2 cursor-pointer relative group"
                        onClick={() => setShowGallery(true)}
                    >
                        <img src={images[0]} alt="Main" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                    {images.slice(1, 5).map((img, idx) => (
                        <div
                            key={idx}
                            className="cursor-pointer relative group"
                            onClick={() => setShowGallery(true)}
                        >
                            <img src={img} alt={`Gallery ${idx + 2}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            {idx === 3 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-lg">
                                    View All Photos
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Room Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title & Rating */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">{room.tenPhong}</h1>
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">4.9</span>
                                    <span className="text-sm">({comments.length} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-5 h-5" />
                                    <span>Nha Trang, Vietnam</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <Card className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-6 h-6 text-rose-500" />
                                    <div>
                                        <div className="font-semibold">{room.khach} Guests</div>
                                        <div className="text-sm text-gray-500">Maximum</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Home className="w-6 h-6 text-rose-500" />
                                    <div>
                                        <div className="font-semibold">{room.phongNgu} Bedrooms</div>
                                        <div className="text-sm text-gray-500">Spacious</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Bed className="w-6 h-6 text-rose-500" />
                                    <div>
                                        <div className="font-semibold">{room.giuong} Beds</div>
                                        <div className="text-sm text-gray-500">Comfortable</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Bath className="w-6 h-6 text-rose-500" />
                                    <div>
                                        <div className="font-semibold">{room.phongTam} Baths</div>
                                        <div className="text-sm text-gray-500">Private</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Description */}
                        <Card className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                            <p className="text-gray-700 leading-relaxed">{room.moTa}</p>
                        </Card>

                        {/* Amenities */}
                        <Card className="p-6">
                            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {amenities.map(
                                    ({ key, label, icon: Icon, value }) =>
                                        value && (
                                            <div key={key} className="flex items-center gap-3">
                                                <Icon className="w-5 h-5 text-rose-500" />
                                                <span className="text-gray-700">{label}</span>
                                            </div>
                                        )
                                )}
                            </div>
                        </Card>

                        {/* Reviews */}
                        <Card className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">
                                Reviews ({comments.length})
                            </h2>

                            {/* Add Review */}
                            <form onSubmit={handleSubmitComment} className="mb-6 pb-6 border-b">
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-2">Your Rating</label>
                                    <RatingStars
                                        rating={newRating}
                                        interactive
                                        onRatingChange={setNewRating}
                                        size={24}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Share your experience..."
                                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                    <Button type="submit">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </form>

                            {/* Comments List */}
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="pb-4 border-b last:border-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                                                    U
                                                </div>
                                                <div>
                                                    <div className="font-semibold">User {comment.maNguoiBinhLuan}</div>
                                                    <div className="text-xs text-gray-500">{comment.ngayBinhLuan}</div>
                                                </div>
                                            </div>
                                            <RatingStars rating={comment.saoBinhLuan} size={14} />
                                        </div>
                                        <p className="text-gray-700 ml-13">{comment.noiDung}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-4">
                            <div className="flex items-baseline justify-between mb-6">
                                <div>
                                    <span className="text-3xl font-bold text-gray-900">${room.giaTien}</span>
                                    <span className="text-gray-600 ml-1">/ night</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">4.9</span>
                                </div>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Check-in</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Check-out</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Guests</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="number"
                                            value={guests}
                                            onChange={(e) => setGuests(Number(e.target.value))}
                                            min="1"
                                            max={room.khach}
                                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            required
                                        />
                                    </div>
                                </div>

                                {nights > 0 && (
                                    <div className="space-y-2 pt-4 border-t">
                                        <div className="flex justify-between text-sm">
                                            <span>
                                                ${room.giaTien} x {nights} nights
                                            </span>
                                            <span>${totalPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Service fee</span>
                                            <span>${Math.round(totalPrice * 0.1)}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                                            <span>Total</span>
                                            <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
                                        </div>
                                    </div>
                                )}

                                <Button type="submit" className="w-full py-3 text-lg">
                                    Reserve
                                </Button>
                            </form>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                You won't be charged yet
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}