import { useState } from 'react'
import Modal from '../../../../components/common/Modal'
import Button from '../../../../components/common/Button'
import type { Booking } from '../../../../types/booking'

interface Props {
    booking: Booking | null
    isOpen: boolean
    onClose: () => void
    // id is optional: when creating there's no id
    onSave: (data: {
        id?: number
        maPhong: number
        maNguoiDung: number
        ngayDen: string
        ngayDi: string
        soLuongKhach: number
    }) => void
}

export default function BookingEditModal({
    booking,
    isOpen,
    onClose,
    onSave,
}: Props) {
    type FormState = {
        maPhong: number | ''
        maNguoiDung: number | ''
        ngayDen: string
        ngayDi: string
        soLuongKhach: number
    }

    const initialForm: FormState = booking
        ? {
              maPhong: booking.maPhong ?? '',
              maNguoiDung: booking.maNguoiDung ?? '',
              ngayDen: booking.ngayDen ? booking.ngayDen.split('T')[0] : '',
              ngayDi: booking.ngayDi ? booking.ngayDi.split('T')[0] : '',
              soLuongKhach: booking.soLuongKhach ?? 1,
          }
        : {
              maPhong: '',
              maNguoiDung: '',
              ngayDen: '',
              ngayDi: '',
              soLuongKhach: 1,
          }

    const [form, setForm] = useState<FormState>(initialForm)

    const handleSave = () => {
        if (!form.maPhong || !form.maNguoiDung) {
            alert('Please provide Room ID and User ID')
            return
        }

        if (!form.ngayDen || !form.ngayDi) {
            alert('Please provide check-in and check-out dates')
            return
        }

        if (new Date(form.ngayDen) > new Date(form.ngayDi)) {
            alert('Check-out must be after or equal to check-in date')
            return
        }

        onSave({
            id: booking ? booking.id : undefined,
            maPhong: Number(form.maPhong),
            maNguoiDung: Number(form.maNguoiDung),
            ngayDen: form.ngayDen,
            ngayDi: form.ngayDi,
            soLuongKhach: Number(form.soLuongKhach),
        })
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            title={booking ? 'Edit Booking' : 'Create Booking'}
        >
            {isOpen && (
                <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div>
                            <label className='block text-sm text-gray-600 mb-1'>
                                Room ID
                            </label>
                            <input
                                type='number'
                                min={1}
                                value={form.maPhong as number | ''}
                                disabled={!!booking}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        maPhong:
                                            e.target.value === ''
                                                ? ''
                                                : Number(e.target.value),
                                    }))
                                }
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                            />
                        </div>

                        <div>
                            <label className='block text-sm text-gray-600 mb-1'>
                                User ID
                            </label>
                            <input
                                type='number'
                                min={1}
                                value={form.maNguoiDung as number | ''}
                                disabled={!!booking}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        maNguoiDung:
                                            e.target.value === ''
                                                ? ''
                                                : Number(e.target.value),
                                    }))
                                }
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                            />
                        </div>

                        <div>
                            <label className='block text-sm text-gray-600 mb-1'>
                                Check-in
                            </label>
                            <input
                                type='date'
                                value={form.ngayDen}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        ngayDen: e.target.value,
                                    }))
                                }
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                            />
                        </div>

                        <div>
                            <label className='block text-sm text-gray-600 mb-1'>
                                Check-out
                            </label>
                            <input
                                type='date'
                                value={form.ngayDi}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        ngayDi: e.target.value,
                                    }))
                                }
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                            />
                        </div>

                        <div>
                            <label className='block text-sm text-gray-600 mb-1'>
                                Guests
                            </label>
                            <input
                                type='number'
                                min={1}
                                value={form.soLuongKhach}
                                onChange={(e) =>
                                    setForm((p) => ({
                                        ...p,
                                        soLuongKhach: Number(e.target.value),
                                    }))
                                }
                                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                            />
                        </div>
                    </div>

                    <div className='flex gap-3 justify-end'>
                        <Button variant='secondary' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className='bg-gray-800 text-white'
                        >
                            Save
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    )
}
