import { Edit2, Trash2 } from 'lucide-react'
import Table from '../../../../components/common/Table'
import Badge from '../../../../components/common/Badge'
import type { User } from '../../../../types'
import DefaultAvatar from '../../../../assets/images/placeholders/default-avatar.svg'

interface Props {
    users: User[]
    onEdit: (user: User) => void
    onDelete: (id: number) => void
}

export const UserTable = ({ users, onEdit, onDelete }: Props) => {
    return (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
            <Table
                headers={[
                    'ID',
                    'Avatar',
                    'Name',
                    'Email',
                    'Birthday',
                    'Phone',
                    'Role',
                    'Gender',
                    'Actions',
                ]}
            >
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className='hover:bg-gray-50 border-b last:border-0'
                    >
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {user.id}
                        </td>
                        <td className='px-4 py-4'>
                            <img
                                src={user.avatar || DefaultAvatar}
                                alt={user.name}
                                className='w-10 h-10 rounded-full object-cover border border-gray-100'
                                onError={(e) =>
                                    (e.currentTarget.src = DefaultAvatar)
                                }
                            />
                        </td>
                        <td className='px-4 py-4 font-medium text-gray-900'>
                            {user.name}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {user.email}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {new Date(user.birthday).toLocaleDateString(
                                'vi-VN',
                            )}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-600'>
                            {user.phone}
                        </td>
                        <td className='px-4 py-4'>
                            <Badge
                                variant={
                                    user.role === 'ADMIN'
                                        ? 'warning'
                                        : 'default'
                                }
                            >
                                {user.role}
                            </Badge>
                        </td>
                        <td className='px-4 py-4 text-sm'>
                            <span
                                className={`px-2 py-1 rounded-md ${user.gender ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}
                            >
                                {user.gender ? 'Male' : 'Female'}
                            </span>
                        </td>
                        <td className='px-4 py-4'>
                            <div className='flex gap-2'>
                                <button
                                    onClick={() => onEdit(user)}
                                    className='p-2 hover:bg-blue-50 rounded-full text-blue-600 transition-colors'
                                >
                                    <Edit2 className='w-4 h-4' />
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)}
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
