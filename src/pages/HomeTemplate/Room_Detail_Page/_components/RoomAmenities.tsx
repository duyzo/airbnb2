import { Wifi, Tv, Wind, Car, Waves, Utensils, Shirt } from 'lucide-react'
import Card from '../../../../components/common/Card'
import type { Room } from '../../../../types/room'

interface RoomAmenitiesProps {
    room: Room
}

export default function RoomAmenities({ room }: RoomAmenitiesProps) {
    const amenities = [
        { key: 'wifi', label: 'WiFi', icon: Wifi, value: room.wifi },
        {
            key: 'dieuHoa',
            label: 'Air Conditioning',
            icon: Wind,
            value: room.dieuHoa,
        },
        { key: 'tivi', label: 'TV', icon: Tv, value: room.tivi },
        { key: 'bep', label: 'Kitchen', icon: Utensils, value: room.bep },
        { key: 'doXe', label: 'Parking', icon: Car, value: room.doXe },
        { key: 'hoBoi', label: 'Pool', icon: Waves, value: room.hoBoi },
        {
            key: 'mayGiat',
            label: 'Washing Machine',
            icon: Shirt,
            value: room.mayGiat,
        },
    ]

    return (
        <Card className='p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Amenities</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {amenities.map(
                    ({ key, label, icon: Icon, value }) =>
                        value && (
                            <div key={key} className='flex items-center gap-3'>
                                <Icon className='w-5 h-5 text-rose-500' />
                                <span className='text-gray-700'>{label}</span>
                            </div>
                        ),
                )}
            </div>
        </Card>
    )
}
