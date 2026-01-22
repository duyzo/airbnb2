import { useState, useEffect } from 'react'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'
import Table from '../../../components/common/Table'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Pagination from '../../../components/common/Pagination'
import Badge from '../../../components/common/Badge'
import type { Room } from '../../../types'

export default function RoomManagement() {
    const [rooms, setRooms] = useState<Room[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(5)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; roomId: number | null }>({
        open: false,
        roomId: null,
    })

    useEffect(() => {
        const mockRooms: Room[] = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            tenPhong: `Room ${i + 1}`,
            khach: 4,
            phongNgu: 2,
            giuong: 2,
            phongTam: 1,
            moTa: 'Beautiful room',
            giaTien: 100,
            mayGiat: true,
            banLa: false,
            tivi: true,
            dieuHoa: true,
            wifi: true,
            bep: true,
            doXe: true,
            hoBoi: false,
            banUi: false,
            maViTri: 1,
            hinhAnh: `https://images.unsplash.com/photo-15600${i}?w=100`,
        }))
        setRooms(mockRooms)
    }, [currentPage, searchTerm])

    const handleDelete = () => {
        if (deleteModal.roomId) {
            setRooms(rooms.filter((r) => r.id !== deleteModal.roomId))
            setDeleteModal({ open: false, roomId: null })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Room Management</h1>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search rooms..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />
                        </div>
                        <Button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900">
                            <Plus className="w-5 h-5" />
                            Add Room
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Table headers={['ID', 'Image', 'Name', 'Guests', 'Bedrooms', 'Price', 'Amenities', 'Actions']}>
                        {rooms.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{room.id}</td>
                                <td className="px-4 py-3">
                                    <img src={room.hinhAnh} alt={room.tenPhong} className="w-16 h-16 object-cover rounded" />
                                </td>
                                <td className="px-4 py-3 font-medium">{room.tenPhong}</td>
                                <td className="px-4 py-3">{room.khach}</td>
                                <td className="px-4 py-3">{room.phongNgu}</td>
                                <td className="px-4 py-3 font-semibold">${room.giaTien}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-1">
                                        {room.wifi && <Badge variant="default">WiFi</Badge>}
                                        {room.hoBoi && <Badge variant="info">Pool</Badge>}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setSelectedRoom(room); setModalOpen(true) }}
                                            className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ open: true, roomId: room.id })}
                                            className="p-1.5 hover:bg-red-50 rounded text-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>

                <div className="mt-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>

                <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedRoom ? 'Edit Room' : 'Add Room'}>
                    <form className="space-y-4 max-h-[70vh] overflow-y-auto">
                        <input type="text" placeholder="Room Name" defaultValue={selectedRoom?.tenPhong} className="w-full px-4 py-2 border rounded-lg" />
                        <input type="number" placeholder="Price" defaultValue={selectedRoom?.giaTien} className="w-full px-4 py-2 border rounded-lg" />
                        <div className="grid grid-cols-2 gap-3">
                            <input type="number" placeholder="Guests" defaultValue={selectedRoom?.khach} className="px-4 py-2 border rounded-lg" />
                            <input type="number" placeholder="Bedrooms" defaultValue={selectedRoom?.phongNgu} className="px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="flex gap-3 justify-end">
                            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                            <Button className="bg-gray-800 hover:bg-gray-900">Save</Button>
                        </div>
                    </form>
                </Modal>

                <Modal open={deleteModal.open} onClose={() => setDeleteModal({ open: false, roomId: null })} title="Delete Room">
                    <div className="space-y-4">
                        <p className="text-gray-700">Are you sure you want to delete this room?</p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="secondary" onClick={() => setDeleteModal({ open: false, roomId: null })}>Cancel</Button>
                            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
