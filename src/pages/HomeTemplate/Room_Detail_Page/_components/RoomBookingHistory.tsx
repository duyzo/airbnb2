import { useMemo } from 'react'
import { Calendar, CheckCircle2, Clock } from 'lucide-react'
import Card from '../../../../components/common/Card'
import type { Booking } from '../../../../types/booking'

interface RoomBookingHistoryProps {
    bookings: Booking[]
    roomId: number
}

export default function RoomBookingHistory({
    bookings,
    roomId,
}: RoomBookingHistoryProps) {
    const { upcoming, past } = useMemo(() => {
        const relevantBookings = bookings.filter((b) => b.maPhong === roomId)
        const now = new Date()

        const upcoming: Booking[] = []
        const past: Booking[] = []

        relevantBookings.forEach((b) => {
            const endDate = new Date(b.ngayDi)
            if (endDate >= now) {
                upcoming.push(b)
            } else {
                past.push(b)
            }
        })

        return {
            upcoming: upcoming.sort(
                (a, b) =>
                    new Date(a.ngayDen).getTime() -
                    new Date(b.ngayDen).getTime(),
            ),
            past: past.sort(
                (a, b) =>
                    new Date(b.ngayDen).getTime() -
                    new Date(a.ngayDen).getTime(),
            ),
        }
    }, [bookings, roomId])

    if (upcoming.length === 0 && past.length === 0) return null

    return (
        <Card className='p-6'>
            <h2 className='text-2xl font-semibold mb-6 flex items-center gap-2'>
                <Calendar className='w-6 h-6 text-rose-500' />
                Your Booking History
            </h2>

            <div className='space-y-6'>
                {upcoming.length > 0 && (
                    <div>
                        <h3 className='font-medium text-green-600 mb-3 flex items-center gap-2'>
                            <Clock className='w-4 h-4' /> Upcoming Stays
                        </h3>
                        <div className='space-y-3'>
                            {upcoming.map((booking) => (
                                <div
                                    key={booking.id}
                                    className='bg-green-50 border border-green-100 rounded-lg p-3 text-sm'
                                >
                                    <div className='font-semibold text-gray-800'>
                                        Booking #{booking.id}
                                    </div>
                                    <div className='flex justify-between mt-1 text-gray-600'>
                                        <span>
                                            {new Date(
                                                booking.ngayDen,
                                            ).toLocaleDateString()}{' '}
                                            -{' '}
                                            {new Date(
                                                booking.ngayDi,
                                            ).toLocaleDateString()}
                                        </span>
                                        <span>
                                            {booking.soLuongKhach} guests
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {past.length > 0 && (
                    <div>
                        <h3 className='font-medium text-gray-500 mb-3 flex items-center gap-2'>
                            <CheckCircle2 className='w-4 h-4' /> Past Visits
                        </h3>
                        <div className='space-y-3'>
                            {past.map((booking) => (
                                <div
                                    key={booking.id}
                                    className='bg-gray-50 border border-gray-100 rounded-lg p-3 text-sm opacity-75'
                                >
                                    <div className='font-semibold text-gray-700'>
                                        Booking #{booking.id}
                                    </div>
                                    <div className='flex justify-between mt-1 text-gray-500'>
                                        <span>
                                            {new Date(
                                                booking.ngayDen,
                                            ).toLocaleDateString()}{' '}
                                            -{' '}
                                            {new Date(
                                                booking.ngayDi,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
