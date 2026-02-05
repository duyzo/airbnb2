import { Star, MapPin, Users, Home, Bed, Bath } from 'lucide-react'
import Card from '../../../../components/common/Card'
import type { Room } from '../../../../types/room'

interface RoomInfoProps {
    room: Room
    totalReviews: number
}

export default function RoomInfo({ room, totalReviews }: RoomInfoProps) {
    return (
        <div className='space-y-6'>
            <div>
                <h1 className='text-3xl font-bold text-gray-900 mb-3'>
                    {room.tenPhong}
                </h1>
                <div className='flex items-center gap-4 text-gray-600'>
                    <div className='flex items-center gap-1'>
                        <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                        <span className='font-semibold'>4.9</span>
                        <span className='text-sm'>
                            ({totalReviews} reviews)
                        </span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <MapPin className='w-5 h-5' />
                        <span>Nha Trang, Vietnam</span>
                    </div>
                </div>
            </div>

            <Card className='p-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='flex items-center gap-3'>
                        <Users className='w-6 h-6 text-rose-500' />
                        <div>
                            <div className='font-semibold'>
                                {room.khach} Guests
                            </div>
                            <div className='text-sm text-gray-500'>Maximum</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Home className='w-6 h-6 text-rose-500' />
                        <div>
                            <div className='font-semibold'>
                                {room.phongNgu} Bedrooms
                            </div>
                            <div className='text-sm text-gray-500'>
                                Spacious
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Bed className='w-6 h-6 text-rose-500' />
                        <div>
                            <div className='font-semibold'>
                                {room.giuong} Beds
                            </div>
                            <div className='text-sm text-gray-500'>
                                Comfortable
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Bath className='w-6 h-6 text-rose-500' />
                        <div>
                            <div className='font-semibold'>
                                {room.phongTam} Baths
                            </div>
                            <div className='text-sm text-gray-500'>Private</div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className='p-6'>
                <h2 className='text-2xl font-semibold mb-4'>
                    About this place
                </h2>
                <p className='text-gray-700 leading-relaxed'>{room.moTa}</p>
            </Card>
        </div>
    )
}
