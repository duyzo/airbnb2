import { Edit2, Trash2 } from 'lucide-react'
import Table from '../../../../components/common/Table'
import Badge from '../../../../components/common/Badge'
import type { Room } from '../../../../types/room'
import NotYet from '../../../../assets/images/placeholders/notyet.png'

interface Props {
    rooms: Room[]
    onEdit: (room: Room) => void
    onDelete: (id: number) => void
}

export const RoomTable = ({ rooms, onEdit, onDelete }: Props) => {
    return (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            <Table
                headers={[
                    'ID',
                    'Image',
                    'Name',
                    'Guests',
                    'Price',
                    'Amenities',
                    'Actions',
                ]}
            >
                {rooms.map((room) => (
                    <tr
                        key={room.id}
                        className='hover:bg-gray-50 border-b last:border-0'
                    >
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {room.id}
                        </td>
                        <td className='px-4 py-4'>
                            <img
                                src={room.hinhAnh || NotYet}
                                alt={room.tenPhong}
                                className='w-16 h-16 object-cover rounded-lg border border-gray-100'
                            />
                        </td>
                        <td className='px-4 py-4'>
                            <div className='font-medium text-gray-900'>
                                {room.tenPhong}
                            </div>
                            <div className='text-xs text-gray-500 truncate max-w-50'>
                                {room.moTa}
                            </div>
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {room.khach} guests • {room.phongNgu} beds
                        </td>
                        <td className='px-4 py-4 font-semibold text-gray-900'>
                            ${room.giaTien}
                        </td>
                        <td className='px-4 py-4'>
                            <div className='flex flex-wrap gap-1 max-w-50'>
                                {room.wifi && (
                                    <Badge variant='default'>WiFi</Badge>
                                )}
                                {room.hoBoi && (
                                    <Badge variant='info'>Pool</Badge>
                                )}
                                {room.dieuHoa && (
                                    <Badge variant='success'>AC</Badge>
                                )}
                                {room.mayGiat && (
                                    <Badge variant='warning'>Washer</Badge>
                                )}
                            </div>
                        </td>
                        <td className='px-4 py-4'>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => onEdit(room)}
                                    className='p-2 hover:bg-blue-50 rounded-full text-blue-600 transition-colors'
                                >
                                    <Edit2 className='w-4 h-4' />
                                </button>
                                <button
                                    onClick={() => onDelete(room.id)}
                                    className='p-2 hover:bg-red-50 rounded-full text-red-600 transition-colors'
                                >
                                    <Trash2 className='w-4 h-4' />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}
