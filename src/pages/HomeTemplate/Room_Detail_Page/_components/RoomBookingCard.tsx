import { useState } from 'react'
import {
    Star,
    Calendar,
    Users,
    Loader2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import Card from '../../../../components/common/Card'
import Button from '../../../../components/common/Button'
import type { Room } from '../../../../types/room'
import type { Booking } from '../../../../types/booking'
import type { AuthState } from '../../../../store/slices/authSlice'
import { bookingService } from '../../../../services/bookingService'

interface RootState {
    auth: AuthState
}

interface RoomBookingCardProps {
    room: Room
    onBookingSuccess: (newBookings: Booking[]) => void
}

export default function RoomBookingCard({
    room,
    onBookingSuccess,
}: RoomBookingCardProps) {
    const user = useSelector((state: RootState) => state.auth.user)
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [statusMessage, setStatusMessage] = useState<{
        type: 'success' | 'error'
        text: string
    } | null>(null)

    const nights =
        checkIn && checkOut
            ? Math.ceil(
                  (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
                      (1000 * 60 * 60 * 24),
              )
            : 0
    const totalPrice = nights * room.giaTien

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatusMessage(null)

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)

        if (checkInDate < today) {
            setStatusMessage({
                type: 'error',
                text: 'Check-in date cannot be in the past.',
            })
            return
        }

        if (checkOutDate <= checkInDate) {
            setStatusMessage({
                type: 'error',
                text: 'Check-out date must be after check-in date.',
            })
            return
        }

        if (!user) {
            setStatusMessage({
                type: 'error',
                text: 'Please login to book a room.',
            })
            return
        }

        try {
            setIsLoading(true)
            const response = await bookingService.create({
                maPhong: room.id,
                ngayDen: checkIn,
                ngayDi: checkOut,
                soLuongKhach: guests,
                maNguoiDung: user.id,
            })

            setStatusMessage({
                type: 'success',
                text: 'Booking confirmed successfully!',
            })

            if (response.data && response.data.content) {
                const result = Array.isArray(response.data.content)
                    ? response.data.content
                    : [response.data.content]
                onBookingSuccess(result)
            }

            setCheckIn('')
            setCheckOut('')
            setGuests(1)
        } catch (error) {
            console.error('Error creating booking:', error)
            setStatusMessage({
                type: 'error',
                text: 'Failed to create booking. Please try again.',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className='p-6 sticky top-4'>
            <div className='flex items-baseline justify-between mb-6'>
                <div>
                    <span className='text-3xl font-bold text-gray-900'>
                        ${room.giaTien}
                    </span>
                    <span className='text-gray-600 ml-1'>/ night</span>
                </div>
                <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-semibold'>4.9</span>
                </div>
            </div>

            <form onSubmit={handleBooking} className='space-y-4'>
                <div className='grid grid-cols-2 gap-3'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Check-in
                        </label>
                        <div className='relative'>
                            <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <input
                                type='date'
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className='w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400'
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium mb-1'>
                            Check-out
                        </label>
                        <div className='relative'>
                            <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <input
                                type='date'
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className='w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400'
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-1'>
                        Guests
                    </label>
                    <div className='relative'>
                        <Users className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                            type='number'
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            min='1'
                            max={room.khach}
                            className='w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400'
                            required
                        />
                    </div>
                </div>

                {nights > 0 && (
                    <div className='space-y-2 pt-4 border-t'>
                        <div className='flex justify-between text-sm'>
                            <span>
                                ${room.giaTien} x {nights} nights
                            </span>
                            <span>${totalPrice}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span>Service fee</span>
                            <span>${Math.round(totalPrice * 0.1)}</span>
                        </div>
                        <div className='flex justify-between font-semibold text-lg pt-2 border-t'>
                            <span>Total</span>
                            <span>
                                ${totalPrice + Math.round(totalPrice * 0.1)}
                            </span>
                        </div>
                    </div>
                )}

                {statusMessage && (
                    <div
                        className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
                            statusMessage.type === 'success'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                        }`}
                    >
                        {statusMessage.type === 'success' ? (
                            <CheckCircle className='w-4 h-4 shrink-0' />
                        ) : (
                            <AlertCircle className='w-4 h-4 shrink-0' />
                        )}
                        {statusMessage.text}
                    </div>
                )}

                <Button
                    type='submit'
                    disabled={isLoading}
                    className='w-full py-3 text-lg flex items-center justify-center gap-2'
                >
                    {isLoading && <Loader2 className='w-5 h-5 animate-spin' />}
                    {isLoading ? 'Booking...' : 'Reserve'}
                </Button>
            </form>

            <p className='text-xs text-gray-500 text-center mt-4'>
                You won't be charged yet
            </p>
        </Card>
    )
}
