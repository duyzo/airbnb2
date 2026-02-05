import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Calendar, Loader2 } from 'lucide-react'
import Card from '../../../components/common/Card'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import BookingCard from './_components/BookingCard'
import EditBookingModal from './_components/EditBookingModal'
import { useBookingListByUserId } from '../../../hooks/apiHooks'
import { bookingService } from '../../../services/bookingService'
import type { Booking } from '../../../types/booking'
import type { AuthState } from '../../../store/slices/authSlice'

interface RootState {
    auth: AuthState
}

export default function MyBookings() {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.auth.user)

    const { data: apiBookings, loading } = useBookingListByUserId({
        userId: user?.id || 0,
    })

    const [localBookings, setLocalBookings] = useState<Booking[]>([])
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
    const [cancelBookingId, setCancelBookingId] = useState<number | null>(null)
    const [isCanceling, setIsCanceling] = useState(false)

    useEffect(() => {
        if (apiBookings) {
            setLocalBookings(apiBookings)
        }
    }, [apiBookings])

    const isUpcoming = (dateString: string) => new Date(dateString) > new Date()

    const filteredBookings = useMemo(() => {
        return localBookings
            .filter((booking) => {
                if (filter === 'upcoming') return isUpcoming(booking.ngayDen)
                if (filter === 'past') return !isUpcoming(booking.ngayDen)
                return true
            })
            .sort(
                (a, b) =>
                    new Date(b.ngayDen).getTime() -
                    new Date(a.ngayDen).getTime(),
            )
    }, [localBookings, filter])

    const handleUpdateBooking = async (
        bookingId: number,
        data: { checkIn: string; checkOut: string; guests: number },
    ) => {
        if (!editingBooking) return

        try {
            const payload = {
                id: bookingId,
                maPhong: editingBooking.maPhong,
                ngayDen: data.checkIn,
                ngayDi: data.checkOut,
                soLuongKhach: data.guests,
                maNguoiDung: user?.id || 0,
            }

            await bookingService.update(payload)

            setLocalBookings((prev) =>
                prev.map((b) =>
                    b.id === bookingId
                        ? {
                              ...b,
                              ngayDen: data.checkIn,
                              ngayDi: data.checkOut,
                              soLuongKhach: data.guests,
                          }
                        : b,
                ),
            )
            setEditingBooking(null)
        } catch (error) {
            console.error('Failed to update booking', error)
            alert('Failed to update booking. Please try again.')
        }
    }

    const handleCancelBooking = async () => {
        if (cancelBookingId) {
            try {
                setIsCanceling(true)
                await bookingService.delete(cancelBookingId)

                setLocalBookings((prev) =>
                    prev.filter((b) => b.id !== cancelBookingId),
                )
                setCancelBookingId(null)
            } catch (error) {
                console.error('Failed to cancel booking', error)
                alert('Failed to cancel booking')
            } finally {
                setIsCanceling(false)
            }
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <Loader2 className='w-10 h-10 animate-spin text-rose-500' />
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container mx-auto px-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                        My Bookings
                    </h1>
                    <div className='flex gap-3'>
                        {(['all', 'upcoming', 'past'] as const).map((f) => (
                            <Button
                                key={f}
                                variant={filter === f ? 'primary' : 'secondary'}
                                onClick={() => setFilter(f)}
                                className='capitalize'
                            >
                                {f}
                            </Button>
                        ))}
                    </div>
                </div>

                {filteredBookings.length === 0 ? (
                    <Card className='p-12 text-center'>
                        <div className='max-w-md mx-auto'>
                            <Calendar className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                            <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                                No bookings found
                            </h3>
                            <p className='text-gray-500 mb-6'>
                                {filter === 'upcoming'
                                    ? "You don't have any upcoming bookings"
                                    : filter === 'past'
                                      ? "You don't have any past bookings"
                                      : "You haven't made any bookings yet"}
                            </p>
                            <Button onClick={() => navigate('/')}>
                                Explore Properties
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className='grid grid-cols-1 gap-6'>
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onEdit={setEditingBooking}
                                onCancel={setCancelBookingId}
                            />
                        ))}
                    </div>
                )}

                <EditBookingModal
                    key={editingBooking?.id || 'new'}
                    isOpen={!!editingBooking}
                    onClose={() => setEditingBooking(null)}
                    booking={editingBooking}
                    onSave={handleUpdateBooking}
                />

                <Modal
                    open={!!cancelBookingId}
                    onClose={() => setCancelBookingId(null)}
                    title='Cancel Booking'
                >
                    <div className='space-y-4'>
                        <p className='text-gray-700'>
                            Are you sure you want to cancel this booking? This
                            action cannot be undone.
                        </p>
                        <div className='flex gap-3 justify-end'>
                            <Button
                                variant='secondary'
                                onClick={() => setCancelBookingId(null)}
                                disabled={isCanceling}
                            >
                                Keep Booking
                            </Button>
                            <Button
                                onClick={handleCancelBooking}
                                disabled={isCanceling}
                                className='bg-red-500 hover:bg-red-600 min-w-30'
                            >
                                {isCanceling ? (
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                ) : (
                                    'Yes, Cancel It'
                                )}
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
