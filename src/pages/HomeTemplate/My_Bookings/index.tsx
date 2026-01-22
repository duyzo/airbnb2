import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, MapPin, Clock, X, Eye } from 'lucide-react'
import Card from '../../../components/common/Card'
import Button from '../../../components/common/Button'
import Badge from '../../../components/common/Badge'
import Modal from '../../../components/common/Modal'
import type { Booking } from '../../../types'

type BookingWithDetails = Booking & {
    roomName: string
    roomImage: string
    location: string
}

export default function MyBookings() {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState<BookingWithDetails[]>([])
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
    const [cancelModal, setCancelModal] = useState<{ open: boolean; bookingId: number | null }>({
        open: false,
        bookingId: null,
    })

    useEffect(() => {
        // TODO: Fetch bookings from API
        const mockBookings: BookingWithDetails[] = [
            {
                id: 1,
                maPhong: 1,
                ngayDen: '2024-03-15',
                ngayDi: '2024-03-20',
                soLuongKhach: 4,
                maNguoiDung: 1,
                roomName: 'Luxury Beachfront Villa',
                roomImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400',
                location: 'Nha Trang, Vietnam',
            },
            {
                id: 2,
                maPhong: 2,
                ngayDen: '2024-02-10',
                ngayDi: '2024-02-15',
                soLuongKhach: 2,
                maNguoiDung: 1,
                roomName: 'Downtown Apartment',
                roomImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
                location: 'Ho Chi Minh City',
            },
            {
                id: 3,
                maPhong: 3,
                ngayDen: '2024-01-05',
                ngayDi: '2024-01-10',
                soLuongKhach: 3,
                maNguoiDung: 1,
                roomName: 'Mountain View Cabin',
                roomImage: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400',
                location: 'Da Lat, Vietnam',
            },
        ]
        setBookings(mockBookings)
    }, [])

    const handleCancelBooking = () => {
        if (cancelModal.bookingId) {
            // TODO: Call cancel API
            setBookings(bookings.filter((b) => b.id !== cancelModal.bookingId))
            setCancelModal({ open: false, bookingId: null })
        }
    }

    const isUpcoming = (dateString: string) => {
        return new Date(dateString) > new Date()
    }

    const filteredBookings = bookings.filter((booking) => {
        if (filter === 'upcoming') return isUpcoming(booking.ngayDen)
        if (filter === 'past') return !isUpcoming(booking.ngayDen)
        return true
    })

    const calculateNights = (checkIn: string, checkOut: string) => {
        const diffTime = new Date(checkOut).getTime() - new Date(checkIn).getTime()
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">My Bookings</h1>
                    <div className="flex gap-3">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'secondary'}
                            onClick={() => setFilter('all')}
                        >
                            All Bookings
                        </Button>
                        <Button
                            variant={filter === 'upcoming' ? 'primary' : 'secondary'}
                            onClick={() => setFilter('upcoming')}
                        >
                            Upcoming
                        </Button>
                        <Button
                            variant={filter === 'past' ? 'primary' : 'secondary'}
                            onClick={() => setFilter('past')}
                        >
                            Past
                        </Button>
                    </div>
                </div>

                {/* Bookings List */}
                {filteredBookings.length === 0 ? (
                    <Card className="p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No bookings found
                            </h3>
                            <p className="text-gray-500 mb-6">
                                {filter === 'upcoming'
                                    ? "You don't have any upcoming bookings"
                                    : filter === 'past'
                                        ? "You don't have any past bookings"
                                        : "You haven't made any bookings yet"}
                            </p>
                            <Button onClick={() => navigate('/listings')}>Explore Properties</Button>
                        </div>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredBookings.map((booking) => {
                            const upcoming = isUpcoming(booking.ngayDen)
                            const nights = calculateNights(booking.ngayDen, booking.ngayDi)

                            return (
                                <Card key={booking.id} className="overflow-hidden">
                                    <div className="flex flex-col md:flex-row">
                                        {/* Image */}
                                        <div className="md:w-64 h-48 md:h-auto shrink-0">
                                            <img
                                                src={booking.roomImage}
                                                alt={booking.roomName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        {booking.roomName}
                                                    </h3>
                                                    <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{booking.location}</span>
                                                    </div>
                                                </div>
                                                <Badge variant={upcoming ? 'success' : 'default'}>
                                                    {upcoming ? 'Upcoming' : 'Completed'}
                                                </Badge>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Calendar className="w-5 h-5 text-rose-500" />
                                                    <div>
                                                        <div className="text-xs text-gray-500">Check-in</div>
                                                        <div className="font-medium">
                                                            {new Date(booking.ngayDen).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Calendar className="w-5 h-5 text-rose-500" />
                                                    <div>
                                                        <div className="text-xs text-gray-500">Check-out</div>
                                                        <div className="font-medium">
                                                            {new Date(booking.ngayDi).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Users className="w-5 h-5 text-rose-500" />
                                                    <div>
                                                        <div className="text-xs text-gray-500">Guests</div>
                                                        <div className="font-medium">{booking.soLuongKhach} guests</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 mb-4">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-600">
                                                    {nights} {nights === 1 ? 'night' : 'nights'}
                                                </span>
                                            </div>

                                            <div className="flex gap-3">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => navigate(`/room/${booking.maPhong}`)}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Property
                                                </Button>
                                                {upcoming && (
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() =>
                                                            setCancelModal({ open: true, bookingId: booking.id })
                                                        }
                                                        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Cancel Booking
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                )}

                {/* Cancel Confirmation Modal */}
                <Modal
                    open={cancelModal.open}
                    onClose={() => setCancelModal({ open: false, bookingId: null })}
                    title="Cancel Booking"
                >
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Are you sure you want to cancel this booking? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="secondary"
                                onClick={() => setCancelModal({ open: false, bookingId: null })}
                            >
                                Keep Booking
                            </Button>
                            <Button
                                onClick={handleCancelBooking}
                                className="bg-red-500 hover:bg-red-600"
                            >
                                Cancel Booking
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
