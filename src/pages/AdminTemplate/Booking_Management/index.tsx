import { useState, useMemo, useEffect } from 'react'
import { Search, Trash2, Plus } from 'lucide-react'
import Table from '../../../components/common/Table'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Badge from '../../../components/common/Badge'
import Pagination from '../../../components/common/Pagination'
import Loading from '../../../components/Loading'
import type { Booking } from '../../../types/booking'
import { useBookingList } from '../../../hooks/apiHooks/bookingHooks/useBookingList'
import { bookingService } from '../../../services/bookingService'
import BookingFilters, {
    type BookingFiltersModel,
} from './_components/BookingFilters'
import BookingActions from './_components/BookingActions'
import BookingEditModal from './_components/BookingEditModal'

/* Using raw Booking type from API; user/room names are not included in the booking response. */
type BookingWithDetails = Booking & {
    userName?: string
    roomName?: string
}

export default function BookingManagement() {
    const { data: bookingsData = [], loading } = useBookingList()
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const [filters, setFilters] = useState<BookingFiltersModel>({
        checkIn: '',
        checkOut: '',
        guests: '',
        status: 'all',
    })

    const handleFiltersChange = (newFilters: BookingFiltersModel) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }
    const [viewModal, setViewModal] = useState<{
        open: boolean
        booking: BookingWithDetails | null
    }>({
        open: false,
        booking: null,
    })
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean
        bookingId: number | null
    }>({
        open: false,
        bookingId: null,
    })

    // Seen bookings persisted in localStorage (IDs)
    const [seenBookings, setSeenBookings] = useState<Set<number>>(() => {
        try {
            const raw = localStorage.getItem('seenBookings')
            const parsed = raw ? JSON.parse(raw) : []
            return new Set<number>(parsed)
        } catch {
            return new Set<number>()
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(
                'seenBookings',
                JSON.stringify(Array.from(seenBookings)),
            )
        } catch (err) {
            console.warn('Failed to persist seenBookings', err)
        }
    }, [seenBookings])

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedForEdit, setSelectedForEdit] = useState<Booking | null>(null)

    const handleToggleSeen = (id: number) => {
        setSeenBookings((prev) => {
            const copy = new Set(prev)
            if (copy.has(id)) copy.delete(id)
            else copy.add(id)
            return copy
        })
    }

    const handleOpenEdit = (booking: Booking) => {
        setSelectedForEdit(booking)
        setEditModalOpen(true)
    }

    const handleSaveEdit = async (data: {
        id?: number
        maPhong: number
        maNguoiDung: number
        ngayDen: string
        ngayDi: string
        soLuongKhach: number
    }) => {
        try {
            if (data.id) {
                // update existing booking
                const payload = {
                    id: data.id,
                    maPhong: data.maPhong,
                    ngayDen: data.ngayDen,
                    ngayDi: data.ngayDi,
                    soLuongKhach: data.soLuongKhach,
                    maNguoiDung: data.maNguoiDung,
                }
                await bookingService.update(payload)
            } else {
                // create new booking
                const createPayload = {
                    maPhong: data.maPhong,
                    ngayDen: data.ngayDen,
                    ngayDi: data.ngayDi,
                    soLuongKhach: data.soLuongKhach,
                    maNguoiDung: data.maNguoiDung,
                }
                await bookingService.create(createPayload)
            }

            window.location.reload()
        } catch (error) {
            console.error(error)
            alert('Save failed')
        } finally {
            setEditModalOpen(false)
            setSelectedForEdit(null)
        }
    }

    const filteredBookings = useMemo(() => {
        const q = searchTerm.trim().toLowerCase()

        return bookingsData.filter((b: Booking) => {
            // text search (booking id or user id or room id or dates)
            if (q) {
                const matchesSearch =
                    b.id.toString().includes(q) ||
                    b.maNguoiDung.toString().includes(q) ||
                    b.maPhong.toString().includes(q) ||
                    b.ngayDen.toLowerCase().includes(q) ||
                    b.ngayDi.toLowerCase().includes(q)

                if (!matchesSearch) return false
            }

            // Filter: check-in
            if (filters.checkIn) {
                if (new Date(b.ngayDen) < new Date(filters.checkIn))
                    return false
            }

            // Filter: check-out
            if (filters.checkOut) {
                if (new Date(b.ngayDi) > new Date(filters.checkOut))
                    return false
            }

            // Filter: guests
            if (filters.guests !== '' && filters.guests !== undefined) {
                if (Number(filters.guests) !== b.soLuongKhach) return false
            }

            // Filter: status
            if (filters.status === 'upcoming') {
                if (!(new Date(b.ngayDen) > new Date())) return false
            }
            if (filters.status === 'completed') {
                if (!(new Date(b.ngayDen) <= new Date())) return false
            }

            return true
        })
    }, [bookingsData, searchTerm, filters])

    const paginatedBookings = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return filteredBookings.slice(start, start + pageSize)
    }, [filteredBookings, currentPage, pageSize])

    const totalPages = Math.ceil(filteredBookings.length / pageSize)

    const handleDelete = async () => {
        if (!deleteModal.bookingId) return

        try {
            await bookingService.delete(deleteModal.bookingId)
            window.location.reload()
        } catch (error) {
            console.error(error)
            alert('Delete failed')
        } finally {
            setDeleteModal({ open: false, bookingId: null })
        }
    }

    const calculateNights = (checkIn: string, checkOut: string) => {
        const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
        return Math.ceil(diff / (1000 * 60 * 60 * 24))
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container mx-auto px-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                        Booking Management
                    </h1>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div className='relative flex-1 max-w-md'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                                placeholder='Search bookings...'
                                className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white'
                            />
                        </div>

                        <div className='flex gap-2'>
                            <button
                                onClick={() => {
                                    setSelectedForEdit(null)
                                    setEditModalOpen(true)
                                }}
                                className='flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-lg'
                            >
                                <Plus className='w-5 h-5' />
                                Add Booking
                            </button>
                        </div>
                    </div>

                    <BookingFilters
                        filters={filters}
                        onChange={handleFiltersChange}
                    />
                </div>

                {loading ? (
                    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                        <Loading />
                    </div>
                ) : (
                    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                        <Table
                            headers={[
                                'ID',
                                'User ID',
                                'Room ID',
                                'Check-in',
                                'Check-out',
                                'Guests',
                                'Nights',
                                'Status',
                                'Actions',
                            ]}
                        >
                            {paginatedBookings.map((booking) => {
                                const nights = calculateNights(
                                    booking.ngayDen,
                                    booking.ngayDi,
                                )
                                const isUpcoming =
                                    new Date(booking.ngayDen) > new Date()

                                return (
                                    <tr
                                        key={booking.id}
                                        className='hover:bg-gray-50'
                                    >
                                        <td className='px-4 py-3'>
                                            {booking.id}
                                        </td>
                                        <td className='px-4 py-3 font-medium'>
                                            {booking.maNguoiDung}
                                        </td>
                                        <td className='px-4 py-3'>
                                            {booking.maPhong}
                                        </td>
                                        <td className='px-4 py-3'>
                                            {new Date(
                                                booking.ngayDen,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className='px-4 py-3'>
                                            {new Date(
                                                booking.ngayDi,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className='px-4 py-3'>
                                            {booking.soLuongKhach}
                                        </td>
                                        <td className='px-4 py-3'>{nights}</td>
                                        <td className='px-4 py-3'>
                                            <Badge
                                                variant={
                                                    isUpcoming
                                                        ? 'success'
                                                        : 'default'
                                                }
                                            >
                                                {isUpcoming
                                                    ? 'Upcoming'
                                                    : 'Completed'}
                                            </Badge>
                                        </td>
                                        <td className='px-4 py-3'>
                                            <div className='flex items-center gap-2'>
                                                <BookingActions
                                                    booking={booking}
                                                    isUpcoming={isUpcoming}
                                                    isCompleted={!isUpcoming}
                                                    isSeen={seenBookings.has(
                                                        booking.id,
                                                    )}
                                                    onSeen={handleToggleSeen}
                                                    onEdit={handleOpenEdit}
                                                    onView={(b) =>
                                                        setViewModal({
                                                            open: true,
                                                            booking: b,
                                                        })
                                                    }
                                                />

                                                <button
                                                    onClick={() =>
                                                        setDeleteModal({
                                                            open: true,
                                                            bookingId:
                                                                booking.id,
                                                        })
                                                    }
                                                    className='p-1.5 hover:bg-red-50 rounded text-red-600'
                                                    title='Delete'
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </Table>
                    </div>
                )}

                {totalPages > 0 && (
                    <div className='mt-6'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                <Modal
                    open={viewModal.open}
                    onClose={() => setViewModal({ open: false, booking: null })}
                    title='Booking Details'
                >
                    {viewModal.booking && (
                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <p className='text-sm text-gray-500'>
                                        User
                                    </p>
                                    <p className='font-medium'>
                                        {viewModal.booking.userName}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>
                                        Room
                                    </p>
                                    <p className='font-medium'>
                                        {viewModal.booking.roomName}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>
                                        Check-in
                                    </p>
                                    <p className='font-medium'>
                                        {new Date(
                                            viewModal.booking.ngayDen,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>
                                        Check-out
                                    </p>
                                    <p className='font-medium'>
                                        {new Date(
                                            viewModal.booking.ngayDi,
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>
                                        Guests
                                    </p>
                                    <p className='font-medium'>
                                        {viewModal.booking.soLuongKhach}
                                    </p>
                                </div>
                                <div>
                                    <p className='text-sm text-gray-500'>
                                        Nights
                                    </p>
                                    <p className='font-medium'>
                                        {calculateNights(
                                            viewModal.booking.ngayDen,
                                            viewModal.booking.ngayDi,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                <BookingEditModal
                    key={
                        selectedForEdit ? selectedForEdit.id : 'create-booking'
                    }
                    booking={selectedForEdit}
                    isOpen={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveEdit}
                />

                <Modal
                    open={deleteModal.open}
                    onClose={() =>
                        setDeleteModal({ open: false, bookingId: null })
                    }
                    title='Cancel Booking'
                >
                    <div className='space-y-4'>
                        <p className='text-gray-700'>
                            Are you sure you want to cancel this booking?
                        </p>
                        <div className='flex gap-3 justify-end'>
                            <Button
                                variant='secondary'
                                onClick={() =>
                                    setDeleteModal({
                                        open: false,
                                        bookingId: null,
                                    })
                                }
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                className='bg-red-500 hover:bg-red-600'
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
