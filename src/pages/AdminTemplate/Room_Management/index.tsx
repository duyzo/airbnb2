import { useState, useMemo } from 'react'
import { Search, Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Pagination from '../../../components/common/Pagination'
import { useRoomList } from '../../../hooks/apiHooks'
import { RoomTable } from './_components/RoomTable'
import { RoomModal, type RoomFormData } from './_components/RoomModal'
import { roomService } from '../../../services/roomService'
import type {
    Room,
    RoomCreateRequest,
    RoomUpdateRequest,
} from '../../../types/room'
import type { AuthState } from '../../../store/slices/authSlice'

export default function RoomManagement() {
    const { data: roomData } = useRoomList()
    const rooms = useMemo(() => roomData || [], [roomData])

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 10

    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean
        roomId: number | null
    }>({
        open: false,
        roomId: null,
    })

    const accessToken = useSelector(
        (state: { auth: AuthState }) => state.auth.token,
    )

    const filteredRooms = useMemo(() => {
        return rooms.filter((room: Room) =>
            room.tenPhong.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    }, [rooms, searchTerm])

    const paginatedRooms = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredRooms.slice(start, start + ITEMS_PER_PAGE)
    }, [filteredRooms, currentPage, ITEMS_PER_PAGE])

    const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE)

    const handleEdit = (room: Room) => {
        setSelectedRoom(room)
        setModalOpen(true)
    }

    const handleDeleteClick = (id: number) => {
        setDeleteModal({ open: true, roomId: id })
    }

    const handleConfirmDelete = async () => {
        if (!deleteModal.roomId || !accessToken) return

        try {
            await roomService.delete(deleteModal.roomId, accessToken)
            window.location.reload()
        } catch (error) {
            console.error(error)
            alert('Delete failed')
        } finally {
            setDeleteModal({ open: false, roomId: null })
        }
    }

    const handleSave = async (data: RoomFormData) => {
        if (!accessToken) return

        try {
            if (selectedRoom) {
                const updatePayload: RoomUpdateRequest = {
                    id: selectedRoom.id,
                    tenPhong: data.tenPhong,
                    khach: data.khach,
                    phongNgu: data.phongNgu,
                    giuong: data.giuong,
                    phongTam: data.phongTam,
                    moTa: data.moTa,
                    giaTien: data.giaTien,
                    mayGiat: data.mayGiat,
                    banLa: data.banLa,
                    tivi: data.tivi,
                    dieuHoa: data.dieuHoa,
                    wifi: data.wifi,
                    bep: data.bep,
                    doXe: data.doXe,
                    hoBoi: data.hoBoi,
                    banUi: data.banUi,
                    maViTri: data.maViTri,
                    hinhAnh: data.hinhAnh,
                }

                await roomService.update(updatePayload, accessToken)

                if (data.file) {
                    const formData = new FormData()
                    formData.append('formFile', data.file)
                    await roomService.uploadImage(
                        formData,
                        selectedRoom.id,
                        accessToken,
                    )
                }
            } else {
                const createPayload: RoomCreateRequest = {
                    tenPhong: data.tenPhong,
                    khach: data.khach,
                    phongNgu: data.phongNgu,
                    giuong: data.giuong,
                    phongTam: data.phongTam,
                    moTa: data.moTa,
                    giaTien: data.giaTien,
                    mayGiat: data.mayGiat,
                    banLa: data.banLa,
                    tivi: data.tivi,
                    dieuHoa: data.dieuHoa,
                    wifi: data.wifi,
                    bep: data.bep,
                    doXe: data.doXe,
                    hoBoi: data.hoBoi,
                    banUi: data.banUi,
                    maViTri: data.maViTri,
                    hinhAnh: data.hinhAnh || '',
                }

                const response = await roomService.create(
                    createPayload,
                    accessToken,
                )

                const createdId = response?.data?.content?.id

                if (data.file && createdId) {
                    const formData = new FormData()
                    formData.append('formFile', data.file)
                    await roomService.uploadImage(
                        formData,
                        createdId,
                        accessToken,
                    )
                }
            }

            window.location.reload()
        } catch (error) {
            console.error(error)
            alert('Action failed')
        } finally {
            setModalOpen(false)
            setSelectedRoom(null)
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false)
        setSelectedRoom(null)
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container mx-auto px-4'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                        Room Management
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
                                placeholder='Search rooms...'
                                className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white'
                            />
                        </div>
                        <Button
                            onClick={() => {
                                setSelectedRoom(null)
                                setModalOpen(true)
                            }}
                            className='flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white'
                        >
                            <Plus className='w-5 h-5' />
                            Add Room
                        </Button>
                    </div>
                </div>

                <RoomTable
                    rooms={paginatedRooms}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />

                {totalPages > 0 && (
                    <div className='mt-6'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                <RoomModal
                    key={selectedRoom ? selectedRoom.id : 'create-room'}
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    room={selectedRoom}
                    onSave={handleSave}
                />

                <Modal
                    open={deleteModal.open}
                    onClose={() =>
                        setDeleteModal({ open: false, roomId: null })
                    }
                    title='Delete Room'
                >
                    <div className='space-y-4'>
                        <p className='text-gray-700'>
                            Are you sure you want to delete this room? This
                            action cannot be undone.
                        </p>
                        <div className='flex gap-3 justify-end'>
                            <Button
                                variant='secondary'
                                onClick={() =>
                                    setDeleteModal({
                                        open: false,
                                        roomId: null,
                                    })
                                }
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmDelete}
                                className='bg-red-500 hover:bg-red-600 text-white'
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
