import { useState, useEffect } from 'react'
import { Search, Eye, Trash2 } from 'lucide-react'
import Table from '../../../components/common/Table'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Badge from '../../../components/common/Badge'
import Pagination from '../../../components/common/Pagination'
import type { Booking } from '../../../types'

type BookingWithDetails = Booking & {
    userName: string
    roomName: string
}

export default function BookingManagement() {
    const [bookings, setBookings] = useState<BookingWithDetails[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(5)
    const [viewModal, setViewModal] = useState<{ open: boolean; booking: BookingWithDetails | null }>({
        open: false,
        booking: null,
    })
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; bookingId: number | null }>({
        open: false,
        bookingId: null,
    })

    useEffect(() => {
        const mockBookings: BookingWithDetails[] = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            maPhong: i + 1,
            ngayDen: '2024-03-15',
            ngayDi: '2024-03-20',
            soLuongKhach: 4,
            maNguoiDung: i + 1,
            userName: `User ${i + 1}`,
            roomName: `Room ${i + 1}`,
        }))
        setBookings(mockBookings)
    }, [currentPage, searchTerm])

    const handleDelete = () => {
        if (deleteModal.bookingId) {
            setBookings(bookings.filter((b) => b.id !== deleteModal.bookingId))
            setDeleteModal({ open: false, bookingId: null })
        }
    }

    const calculateNights = (checkIn: string, checkOut: string) => {
        const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
        return Math.ceil(diff / (1000 * 60 * 60 * 24))
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Management</h1>
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search bookings..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Table headers={['ID', 'User', 'Room', 'Check-in', 'Check-out', 'Guests', 'Nights', 'Status', 'Actions']}>
                        {bookings.map((booking) => {
                            const nights = calculateNights(booking.ngayDen, booking.ngayDi)
                            const isUpcoming = new Date(booking.ngayDen) > new Date()

                            return (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{booking.id}</td>
                                    <td className="px-4 py-3 font-medium">{booking.userName}</td>
                                    <td className="px-4 py-3">{booking.roomName}</td>
                                    <td className="px-4 py-3">{new Date(booking.ngayDen).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">{new Date(booking.ngayDi).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">{booking.soLuongKhach}</td>
                                    <td className="px-4 py-3">{nights}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={isUpcoming ? 'success' : 'default'}>
                                            {isUpcoming ? 'Upcoming' : 'Completed'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setViewModal({ open: true, booking })}
                                                className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setDeleteModal({ open: true, bookingId: booking.id })}
                                                className="p-1.5 hover:bg-red-50 rounded text-red-600"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </Table>
                </div>

                <div className="mt-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>

                <Modal open={viewModal.open} onClose={() => setViewModal({ open: false, booking: null })} title="Booking Details">
                    {viewModal.booking && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">User</p>
                                    <p className="font-medium">{viewModal.booking.userName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Room</p>
                                    <p className="font-medium">{viewModal.booking.roomName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Check-in</p>
                                    <p className="font-medium">{new Date(viewModal.booking.ngayDen).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Check-out</p>
                                    <p className="font-medium">{new Date(viewModal.booking.ngayDi).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Guests</p>
                                    <p className="font-medium">{viewModal.booking.soLuongKhach}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Nights</p>
                                    <p className="font-medium">{calculateNights(viewModal.booking.ngayDen, viewModal.booking.ngayDi)}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                <Modal open={deleteModal.open} onClose={() => setDeleteModal({ open: false, bookingId: null })} title="Cancel Booking">
                    <div className="space-y-4">
                        <p className="text-gray-700">Are you sure you want to cancel this booking?</p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="secondary" onClick={() => setDeleteModal({ open: false, bookingId: null })}>Cancel</Button>
                            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Confirm</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
