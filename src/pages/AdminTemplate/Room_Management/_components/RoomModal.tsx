import { useState, useRef, type ChangeEvent } from 'react'
import { Upload, X } from 'lucide-react'
import Modal from '../../../../components/common/Modal'
import Button from '../../../../components/common/Button'
import type { Room } from '../../../../types/room'

export interface RoomFormData {
    tenPhong: string
    khach: number
    phongNgu: number
    giuong: number
    phongTam: number
    moTa: string
    giaTien: number
    mayGiat: boolean
    banLa: boolean
    tivi: boolean
    dieuHoa: boolean
    wifi: boolean
    bep: boolean
    doXe: boolean
    hoBoi: boolean
    banUi: boolean
    maViTri: number
    hinhAnh: string
    file: File | null
}

interface RoomFormProps {
    room: Room | null
    onSave: (data: RoomFormData) => void
    onCancel: () => void
}

const RoomForm = ({ room, onSave, onCancel }: RoomFormProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState<RoomFormData>({
        tenPhong: room?.tenPhong || '',
        khach: room?.khach || 1,
        phongNgu: room?.phongNgu || 1,
        giuong: room?.giuong || 1,
        phongTam: room?.phongTam || 1,
        moTa: room?.moTa || '',
        giaTien: room?.giaTien || 0,
        mayGiat: room?.mayGiat || false,
        banLa: room?.banLa || false,
        tivi: room?.tivi || false,
        dieuHoa: room?.dieuHoa || false,
        wifi: room?.wifi || false,
        bep: room?.bep || false,
        doXe: room?.doXe || false,
        hoBoi: room?.hoBoi || false,
        banUi: room?.banUi || false,
        maViTri: room?.maViTri || 0,
        hinhAnh: room?.hinhAnh || '',
        file: null,
    })

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] })
        }
    }

    const handleRemoveFile = () => {
        setFormData({ ...formData, file: null })
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleChange = <K extends keyof RoomFormData>(
        field: K,
        value: RoomFormData[K],
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }) as RoomFormData)
    }

    return (
        <div className='space-y-4 max-h-[70vh] overflow-y-auto px-1'>
            <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Room Name
                    </label>
                    <input
                        type='text'
                        value={formData.tenPhong}
                        onChange={(e) =>
                            handleChange('tenPhong', e.target.value)
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>

                <div className='col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Description
                    </label>
                    <textarea
                        rows={3}
                        value={formData.moTa}
                        onChange={(e) => handleChange('moTa', e.target.value)}
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Price ($)
                    </label>
                    <input
                        type='number'
                        value={formData.giaTien}
                        onChange={(e) =>
                            handleChange('giaTien', Number(e.target.value))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Location ID
                    </label>
                    <input
                        type='number'
                        value={formData.maViTri}
                        onChange={(e) =>
                            handleChange('maViTri', Number(e.target.value))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Guests
                    </label>
                    <input
                        type='number'
                        value={formData.khach}
                        onChange={(e) =>
                            handleChange('khach', Number(e.target.value))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Bedrooms
                    </label>
                    <input
                        type='number'
                        value={formData.phongNgu}
                        onChange={(e) =>
                            handleChange('phongNgu', Number(e.target.value))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Beds
                    </label>
                    <input
                        type='number'
                        value={formData.giuong}
                        onChange={(e) =>
                            handleChange('giuong', Number(e.target.value))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Baths
                    </label>
                    <input
                        type='number'
                        value={formData.phongTam}
                        onChange={(e) =>
                            handleChange('phongTam', Number(e.target.value))
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Amenities
                </label>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                    {[
                        { key: 'wifi', label: 'Wifi' },
                        { key: 'dieuHoa', label: 'AC' },
                        { key: 'bep', label: 'Kitchen' },
                        { key: 'mayGiat', label: 'Washer' },
                        { key: 'banLa', label: 'Iron' },
                        { key: 'tivi', label: 'TV' },
                        { key: 'hoBoi', label: 'Pool' },
                        { key: 'doXe', label: 'Parking' },
                        { key: 'banUi', label: 'Iron Board' },
                    ].map((item) => (
                        <label
                            key={item.key}
                            className='flex items-center gap-2 cursor-pointer'
                        >
                            <input
                                type='checkbox'
                                checked={
                                    formData[
                                        item.key as keyof RoomFormData
                                    ] as boolean
                                }
                                onChange={(e) =>
                                    handleChange(
                                        item.key as keyof RoomFormData,
                                        e.target.checked,
                                    )
                                }
                                className='rounded text-gray-800 focus:ring-gray-800'
                            />
                            <span className='text-sm text-gray-600'>
                                {item.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Image URL (String)
                </label>
                <input
                    type='text'
                    value={formData.hinhAnh}
                    onChange={(e) => handleChange('hinhAnh', e.target.value)}
                    placeholder='https://...'
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 mb-2'
                />
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Upload New Image (File)
                </label>
                <div className='flex items-center gap-2'>
                    <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <Button
                        type='button'
                        variant='secondary'
                        onClick={() => fileInputRef.current?.click()}
                        className='flex items-center gap-2'
                    >
                        <Upload className='w-4 h-4' />
                        {formData.file ? 'Change File' : 'Choose File'}
                    </Button>
                    {formData.file && (
                        <div className='flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-md'>
                            <span className='text-sm text-gray-600 truncate max-w-37.5'>
                                {formData.file.name}
                            </span>
                            <button
                                onClick={handleRemoveFile}
                                className='text-gray-500 hover:text-red-500'
                            >
                                <X className='w-4 h-4' />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex gap-3 justify-end mt-6 pt-4 border-t'>
                <Button variant='secondary' onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    onClick={() => onSave(formData)}
                    className='bg-gray-800 hover:bg-gray-900 text-white'
                >
                    {room ? 'Update Room' : 'Create Room'}
                </Button>
            </div>
        </div>
    )
}

interface Props {
    isOpen: boolean
    onClose: () => void
    room: Room | null
    onSave: (data: RoomFormData) => void
}

export const RoomModal = ({ isOpen, onClose, room, onSave }: Props) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            title={room ? 'Edit Room' : 'Add New Room'}
        >
            {isOpen && (
                <RoomForm
                    key={room ? room.id : 'create-new-room'}
                    room={room}
                    onSave={onSave}
                    onCancel={onClose}
                />
            )}
        </Modal>
    )
}
