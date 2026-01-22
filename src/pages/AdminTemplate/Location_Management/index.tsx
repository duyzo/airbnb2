import { useState, useEffect, useRef } from 'react'
import { Search, Plus, Edit2, Trash2, Upload } from 'lucide-react'
import Table from '../../../components/common/Table'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Pagination from '../../../components/common/Pagination'
import type { Location } from '../../../types'

export default function LocationManagement() {
    const [locations, setLocations] = useState<Location[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(5)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; locationId: number | null }>({
        open: false,
        locationId: null,
    })
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // TODO: Fetch locations from API
        const mockLocations: Location[] = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            tenViTri: `Location ${i + 1}`,
            tinhThanh: `City ${i + 1}`,
            quocGia: 'Vietnam',
            hinhAnh: `https://images.unsplash.com/photo-156000000${i}?w=100`,
        }))
        setLocations(mockLocations)
    }, [currentPage, searchTerm])

    const handleDelete = () => {
        if (deleteModal.locationId) {
            // TODO: Call delete API
            setLocations(locations.filter((l) => l.id !== deleteModal.locationId))
            setDeleteModal({ open: false, locationId: null })
        }
    }

    const handleEdit = (location: Location) => {
        setSelectedLocation(location)
        setModalOpen(true)
    }

    const handleAdd = () => {
        setSelectedLocation(null)
        setModalOpen(true)
    }

    const handleSave = () => {
        // TODO: Call create/update API
        setModalOpen(false)
        setSelectedLocation(null)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Location Management</h1>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search locations..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />
                        </div>
                        <Button onClick={handleAdd} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900">
                            <Plus className="w-5 h-5" />
                            Add Location
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Table headers={['ID', 'Image', 'Name', 'City', 'Country', 'Actions']}>
                        {locations.map((location) => (
                            <tr key={location.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{location.id}</td>
                                <td className="px-4 py-3">
                                    <img
                                        src={location.hinhAnh}
                                        alt={location.tenViTri}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium">{location.tenViTri}</td>
                                <td className="px-4 py-3 text-gray-600">{location.tinhThanh}</td>
                                <td className="px-4 py-3 text-gray-600">{location.quocGia}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(location)}
                                            className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ open: true, locationId: location.id })}
                                            className="p-1.5 hover:bg-red-50 rounded text-red-600"
                                            title="Delete"
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

                <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedLocation ? 'Edit Location' : 'Add Location'}>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Location Name"
                            defaultValue={selectedLocation?.tenViTri}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <input
                            type="text"
                            placeholder="City/Province"
                            defaultValue={selectedLocation?.tinhThanh}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            defaultValue={selectedLocation?.quocGia}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <div>
                            <label className="block text-sm font-medium mb-2">Image</label>
                            <div className="flex gap-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                                />
                                <Button type="button" variant="secondary">
                                    <Upload className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <Button variant="secondary" onClick={() => setModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="bg-gray-800 hover:bg-gray-900">
                                Save
                            </Button>
                        </div>
                    </form>
                </Modal>

                <Modal open={deleteModal.open} onClose={() => setDeleteModal({ open: false, locationId: null })} title="Delete Location">
                    <div className="space-y-4">
                        <p className="text-gray-700">Are you sure you want to delete this location?</p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="secondary" onClick={() => setDeleteModal({ open: false, locationId: null })}>
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}
