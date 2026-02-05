import Button from '../../../../components/common/Button'
import { Eye, Edit3 } from 'lucide-react'
import type { Booking } from '../../../../types/booking'

interface Props {
    booking: Booking
    isUpcoming: boolean
    isCompleted: boolean
    isSeen: boolean
    onSeen: (id: number) => void
    onEdit: (booking: Booking) => void
    onView: (booking: Booking) => void
}

export default function BookingActions({
    booking,
    isUpcoming,
    onEdit,
    onView,
}: Props) {
    return (
        <div className='flex items-center gap-2'>
            <button
                onClick={() => onView(booking)}
                className='p-1.5 hover:bg-blue-50 rounded text-blue-600'
                title='View'
            >
                <Eye className='w-4 h-4' />
            </button>

            {isUpcoming && (
                <Button
                    onClick={() => onEdit(booking)}
                    className='px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200'
                >
                    <span className='inline-flex items-center gap-2'>
                        <Edit3 className='w-4 h-4' />
                        Edit
                    </span>
                </Button>
            )}
        </div>
    )
}
