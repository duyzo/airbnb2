import { Edit2, Trash2 } from 'lucide-react'
import Table from '../../../../components/common/Table'
import type { Location } from '../../../../types/location'
import NotYet from '../../../../assets/images/placeholders/notyet.png'

interface Props {
    locations: Location[]
    onEdit: (location: Location) => void
    onDelete: (id: number) => void
}

export const LocationTable = ({ locations, onEdit, onDelete }: Props) => {
    return (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            <Table
                headers={[
                    'ID',
                    'Image',
                    'Location',
                    'City',
                    'Country',
                    'Actions',
                ]}
            >
                {locations.map((location) => (
                    <tr
                        key={location.id}
                        className='hover:bg-gray-50 border-b last:border-0'
                    >
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {location.id}
                        </td>
                        <td className='px-4 py-4'>
                            <img
                                src={location.hinhAnh || NotYet}
                                alt={location.tenViTri}
                                className='w-16 h-16 object-cover rounded-lg border border-gray-100'
                            />
                        </td>
                        <td className='px-4 py-4 font-medium text-gray-900'>
                            {location.tenViTri}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {location.tinhThanh}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {location.quocGia}
                        </td>
                        <td className='px-4 py-4'>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => onEdit(location)}
                                    className='p-2 hover:bg-blue-50 rounded-full text-blue-600 transition-colors'
                                >
                                    <Edit2 className='w-4 h-4' />
                                </button>
                                <button
                                    onClick={() => onDelete(location.id)}
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
