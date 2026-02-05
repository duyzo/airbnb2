import { useState, useRef, type ChangeEvent } from 'react'
import { Upload, X } from 'lucide-react'
import Modal from '../../../../components/common/Modal'
import Button from '../../../../components/common/Button'
import type { Location } from '../../../../types/location'

export interface LocationFormData {
    tenViTri: string
    tinhThanh: string
    quocGia: string
    hinhAnh: string
    file: File | null
}

interface LocationFormProps {
    location: Location | null
    onSave: (data: LocationFormData) => void
    onCancel: () => void
}

const LocationForm = ({ location, onSave, onCancel }: LocationFormProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [formData, setFormData] = useState<LocationFormData>({
        tenViTri: location?.tenViTri || '',
        tinhThanh: location?.tinhThanh || '',
        quocGia: location?.quocGia || '',
        hinhAnh: location?.hinhAnh || '',
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

    return (
        <div className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Location Name
                </label>
                <input
                    type='text'
                    value={formData.tenViTri}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            tenViTri: e.target.value,
                        })
                    }
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        City/Province
                    </label>
                    <input
                        type='text'
                        value={formData.tinhThanh}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                tinhThanh: e.target.value,
                            })
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Country
                    </label>
                    <input
                        type='text'
                        value={formData.quocGia}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                quocGia: e.target.value,
                            })
                        }
                        className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>
            </div>

            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Image URL (String)
                </label>
                <input
                    type='text'
                    value={formData.hinhAnh}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            hinhAnh: e.target.value,
                        })
                    }
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

            <div className='flex gap-3 justify-end mt-6'>
                <Button variant='secondary' onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    onClick={() => onSave(formData)}
                    className='bg-gray-800 hover:bg-gray-900 text-white'
                >
                    {location ? 'Update Location' : 'Create Location'}
                </Button>
            </div>
        </div>
    )
}

interface Props {
    isOpen: boolean
    onClose: () => void
    location: Location | null
    onSave: (data: LocationFormData) => void
}

export const LocationModal = ({ isOpen, onClose, location, onSave }: Props) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            title={location ? 'Edit Location' : 'Add Location'}
        >
            {isOpen && (
                <LocationForm
                    key={location ? location.id : 'new-location'}
                    location={location}
                    onSave={onSave}
                    onCancel={onClose}
                />
            )}
        </Modal>
    )
}
