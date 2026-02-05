import { useNavigate } from 'react-router-dom'
import {
    Calendar,
    Users,
    MapPin,
    Clock,
    Eye,
    Edit2,
    X,
    Loader2,
} from 'lucide-react'
import Card from '../../../../components/common/Card'
import Button from '../../../../components/common/Button'
import Badge from '../../../../components/common/Badge'
import { useRoomById } from '../../../../hooks/apiHooks/roomHooks/useRoomById'
import type { Booking } from '../../../../types/booking'

interface BookingCardProps {
    booking: Booking
    onEdit: (booking: Booking) => void
    onCancel: (bookingId: number) => void
}

export default function BookingCard({
    booking,
    onEdit,
    onCancel,
}: BookingCardProps) {
    const navigate = useNavigate()
    const { data: room, loading } = useRoomById({ id: booking.maPhong })

    const isUpcoming = new Date(booking.ngayDen) > new Date()

    const calculateNights = (checkIn: string, checkOut: string) => {
        const diffTime =
            new Date(checkOut).getTime() - new Date(checkIn).getTime()
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    const nights = calculateNights(booking.ngayDen, booking.ngayDi)

    if (loading || !room) {
        return (
            <Card className='p-6 flex items-center justify-center min-h-50'>
                <Loader2 className='w-8 h-8 animate-spin text-rose-500' />
            </Card>
        )
    }

    return (
        <Card className='overflow-hidden transition-shadow hover:shadow-md'>
            <div className='flex flex-col md:flex-row'>
                <div className='md:w-64 h-48 md:h-auto shrink-0 relative'>
                    <img
                        src={room.hinhAnh}
                        alt={room.tenPhong}
                        className='w-full h-full object-cover'
                    />
                    <div className='absolute top-2 left-2'>
                        <Badge variant={isUpcoming ? 'success' : 'default'}>
                            {isUpcoming ? 'Upcoming' : 'Completed'}
                        </Badge>
                    </div>
                </div>

                <div className='flex-1 p-6'>
                    <div className='flex justify-between items-start mb-4'>
                        <div>
                            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                                {room.tenPhong}
                            </h3>
                            <div className='flex items-center gap-1 text-gray-600 text-sm'>
                                <MapPin className='w-4 h-4' />
                                <span>Vietnam</span>
                            </div>
                        </div>
                        <div className='text-right hidden md:block'>
                            <p className='text-sm text-gray-500'>Total Price</p>
                            <p className='text-xl font-bold text-rose-500'>
                                ${nights * room.giaTien}
                            </p>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                        <div className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                            <Calendar className='w-5 h-5 text-rose-500' />
                            <div>
                                <div className='text-xs text-gray-500'>
                                    Check-in
                                </div>
                                <div className='font-medium text-sm'>
                                    {new Date(
                                        booking.ngayDen,
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                            <Calendar className='w-5 h-5 text-rose-500' />
                            <div>
                                <div className='text-xs text-gray-500'>
                                    Check-out
                                </div>
                                <div className='font-medium text-sm'>
                                    {new Date(
                                        booking.ngayDi,
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg'>
                            <Users className='w-5 h-5 text-rose-500' />
                            <div>
                                <div className='text-xs text-gray-500'>
                                    Guests
                                </div>
                                <div className='font-medium text-sm'>
                                    {booking.soLuongKhach} guests
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center justify-between border-t pt-4'>
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <Clock className='w-4 h-4' />
                            <span>
                                {nights} {nights === 1 ? 'night' : 'nights'}{' '}
                                stay
                            </span>
                        </div>

                        <div className='flex gap-2'>
                            <Button
                                variant='ghost'
                                onClick={() =>
                                    navigate(`/room/${booking.maPhong}`)
                                }
                                className='flex items-center gap-2'
                            >
                                <Eye className='w-4 h-4' />
                                <span className='hidden sm:inline'>View</span>
                            </Button>

                            {isUpcoming && (
                                <>
                                    <Button
                                        variant='secondary'
                                        onClick={() => onEdit(booking)}
                                        className='flex items-center gap-2'
                                    >
                                        <Edit2 className='w-4 h-4' />
                                        <span className='hidden sm:inline'>
                                            Edit
                                        </span>
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        onClick={() => onCancel(booking.id)}
                                        className='flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50'
                                    >
                                        <X className='w-4 h-4' />
                                        <span className='hidden sm:inline'>
                                            Cancel
                                        </span>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
