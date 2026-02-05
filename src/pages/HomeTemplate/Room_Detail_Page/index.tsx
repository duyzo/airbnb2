import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useRoomById } from '../../../hooks/apiHooks/roomHooks/useRoomById'
import { useBookingListByUserId } from '../../../hooks/apiHooks'
import type { AuthState } from '../../../store/slices/authSlice'
import type { Booking } from '../../../types/booking'

import RoomImages from './_components/RoomImages'
import RoomInfo from './_components/RoomInfo'
import RoomAmenities from './_components/RoomAmenities'
import RoomReviews from './_components/RoomReviews'
import RoomBookingCard from './_components/RoomBookingCard'
import RoomBookingHistory from './_components/RoomBookingHistory'

interface RootState {
    auth: AuthState
}

export default function RoomDetailPage() {
    const { id } = useParams<{ id: string }>()
    const user = useSelector((state: RootState) => state.auth.user)
    const roomId = Number(id)

    const { data: room } = useRoomById({ id: roomId })
    const { data: initialBookings } = useBookingListByUserId({
        userId: user?.id || 0,
    })

    const [totalReviews, setTotalReviews] = useState(0)
    const [newBookings, setNewBookings] = useState<Booking[]>([])

    // Merge server data with locally created bookings for immediate UI feedback without re-fetching
    const displayBookings = useMemo(() => {
        const serverData = initialBookings || []
        const serverIds = new Set(serverData.map((b) => b.id))

        // Ensure we don't duplicate bookings if they already exist in server data
        const uniqueNewBookings = newBookings.filter(
            (b) => !serverIds.has(b.id),
        )

        return [...serverData, ...uniqueNewBookings]
    }, [initialBookings, newBookings])

    const handleNewBooking = (createdBookings: Booking[]) => {
        setNewBookings((prev) => {
            const existingIds = new Set(prev.map((b) => b.id))
            const uniqueIncoming = createdBookings.filter(
                (b) => !existingIds.has(b.id),
            )
            return [...prev, ...uniqueIncoming]
        })
    }

    const images = [
        room?.hinhAnh,
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
        'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200',
    ]

    if (!room) {
        return <div className='container mx-auto px-4 py-8'>Loading...</div>
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <RoomImages images={images} />

            <div className='container mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 space-y-6'>
                        <RoomInfo room={room} totalReviews={totalReviews} />

                        <RoomBookingHistory
                            bookings={displayBookings}
                            roomId={roomId}
                        />

                        <RoomAmenities room={room} />
                        <RoomReviews
                            roomId={roomId}
                            onTotalCommentsChange={setTotalReviews}
                        />
                    </div>

                    <div className='lg:col-span-1'>
                        <RoomBookingCard
                            room={room}
                            onBookingSuccess={handleNewBooking}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
