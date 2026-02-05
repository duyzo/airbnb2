import { useState } from 'react'
import { Calendar, Users, AlertCircle, Loader2 } from 'lucide-react'
import Modal from '../../../../components/common/Modal'
import Button from '../../../../components/common/Button'
import type { Booking } from '../../../../types/booking'

interface EditBookingModalProps {
    isOpen: boolean
    onClose: () => void
    booking: Booking | null
    onSave: (
        bookingId: number,
        data: { checkIn: string; checkOut: string; guests: number },
    ) => Promise<void>
}

export default function EditBookingModal({
    isOpen,
    onClose,
    booking,
    onSave,
}: EditBookingModalProps) {
    const [checkIn, setCheckIn] = useState(
        booking?.ngayDen ? booking.ngayDen.split('T')[0] : '',
    )
    const [checkOut, setCheckOut] = useState(
        booking?.ngayDi ? booking.ngayDi.split('T')[0] : '',
    )
    const [guests, setGuests] = useState(booking?.soLuongKhach || 1)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSave = async () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const start = new Date(checkIn)
        const end = new Date(checkOut)

        if (start < today) {
            setError('Check-in date cannot be in the past')
            return
        }
        if (end <= start) {
            setError('Check-out date must be after check-in date')
            return
        }
        if (guests < 1) {
            setError('Guests must be at least 1')
            return
        }

        if (booking) {
            try {
                setIsSubmitting(true)
                setError('')
                await onSave(booking.id, { checkIn, checkOut, guests })
                onClose()
            } catch (err) {
                setError('Failed to update booking. Please try again.')
                console.error(err)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    return (
        <Modal open={isOpen} onClose={onClose} title='Edit Booking Details'>
            <div className='space-y-4 pt-2'>
                {error && (
                    <div className='p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2'>
                        <AlertCircle className='w-4 h-4' />
                        {error}
                    </div>
                )}

                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Check-in
                        </label>
                        <div className='relative'>
                            <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <input
                                type='date'
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className='w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Check-out
                        </label>
                        <div className='relative'>
                            <Calendar className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                            <input
                                type='date'
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className='w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400'
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Guests
                    </label>
                    <div className='relative'>
                        <Users className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <input
                            type='number'
                            min='1'
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className='w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400'
                        />
                    </div>
                </div>

                <div className='flex justify-end gap-3 pt-4 border-t mt-6'>
                    <Button
                        variant='secondary'
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className='min-w-30'
                    >
                        {isSubmitting ? (
                            <Loader2 className='w-4 h-4 animate-spin' />
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
