import { useEffect, useState } from 'react'
import Modal from '../../../../components/common/Modal'
import Button from '../../../../components/common/Button'
import type { User } from '../../../../types'

export interface UserFormData {
    name: string
    email: string
    password?: string
    phone: string
    birthday: string
    gender: boolean
    role?: 'ADMIN' | 'USER'
}

interface Props {
    isOpen: boolean
    onClose: () => void
    user: User | null
    onSave: (data: UserFormData) => Promise<void>
}

const INITIAL_STATE: UserFormData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: true,
    role: 'USER',
}

export const UserModal = ({ isOpen, onClose, user, onSave }: Props) => {
    const [formData, setFormData] = useState<UserFormData>(INITIAL_STATE)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isOpen && user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                birthday: user.birthday
                    ? new Date(user.birthday).toISOString().split('T')[0]
                    : '',
                gender: user.gender,
                role: user.role as 'ADMIN' | 'USER',
            })
        } else if (isOpen) {
            setFormData(INITIAL_STATE)
        }
    }, [isOpen, user])

    const handleChange = (
        field: keyof UserFormData,
        value: string | boolean,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            await onSave(formData)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            title={user ? 'Edit User' : 'Add User'}
        >
            <div className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Full Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type='text'
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder='Enter name'
                        className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none'
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Email Address{' '}
                            <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='email'
                            value={formData.email}
                            onChange={(e) =>
                                handleChange('email', e.target.value)
                            }
                            placeholder='Enter email'
                            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Phone Number <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='tel'
                            value={formData.phone}
                            onChange={(e) =>
                                handleChange('phone', e.target.value)
                            }
                            placeholder='Enter phone'
                            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none'
                        />
                    </div>
                </div>

                {!user && (
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Password <span className='text-red-500'>*</span>
                        </label>
                        <input
                            type='password'
                            value={formData.password}
                            onChange={(e) =>
                                handleChange('password', e.target.value)
                            }
                            placeholder='Enter password'
                            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none'
                        />
                    </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Birthday
                        </label>
                        <input
                            type='date'
                            value={formData.birthday}
                            onChange={(e) =>
                                handleChange('birthday', e.target.value)
                            }
                            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Gender
                        </label>
                        <select
                            value={formData.gender ? 'true' : 'false'}
                            onChange={(e) =>
                                handleChange(
                                    'gender',
                                    e.target.value === 'true',
                                )
                            }
                            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none bg-white'
                        >
                            <option value='true'>Male</option>
                            <option value='false'>Female</option>
                        </select>
                    </div>
                </div>

                {user && (
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Role <span className='text-red-500'>*</span>
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) =>
                                handleChange('role', e.target.value)
                            }
                            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-800 outline-none bg-white'
                        >
                            <option value='USER'>User</option>
                            <option value='ADMIN'>Admin</option>
                        </select>
                    </div>
                )}

                <div className='flex gap-3 justify-end mt-6'>
                    <Button
                        variant='secondary'
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className='bg-gray-800 hover:bg-gray-900 text-white min-w-25'
                    >
                        {isLoading
                            ? 'Saving...'
                            : user
                              ? 'Update User'
                              : 'Create User'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
