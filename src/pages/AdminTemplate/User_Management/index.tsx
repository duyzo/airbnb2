import { useState, useEffect } from 'react'
import { Search, Plus, Edit2, Trash2 } from 'lucide-react'
import Table from '../../../components/common/Table'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Badge from '../../../components/common/Badge'
import Pagination from '../../../components/common/Pagination'
import type { User } from '../../../types'

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages] = useState(5)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; userId: number | null }>({
        open: false,
        userId: null,
    })

    useEffect(() => {
        // TODO: Fetch users from API
        const mockUsers: User[] = Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            phone: `+84 12345678${i}`,
            birthday: '1990-01-01',
            avatar: `https://via.placeholder.com/50`,
            gender: i % 2 === 0,
            role: i < 2 ? 'ADMIN' : 'USER',
        }))
        setUsers(mockUsers)
    }, [currentPage, searchTerm])

    const handleDelete = () => {
        if (deleteModal.userId) {
            // TODO: Call delete API
            setUsers(users.filter((u) => u.id !== deleteModal.userId))
            setDeleteModal({ open: false, userId: null })
        }
    }

    const handleEdit = (user: User) => {
        setSelectedUser(user)
        setModalOpen(true)
    }

    const handleAdd = () => {
        setSelectedUser(null)
        setModalOpen(true)
    }

    const handleSave = () => {
        // TODO: Call create/update API
        setModalOpen(false)
        setSelectedUser(null)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">User Management</h1>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                            />
                        </div>
                        <Button onClick={handleAdd} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900">
                            <Plus className="w-5 h-5" />
                            Add User
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <Table headers={['ID', 'Avatar', 'Name', 'Email', 'Phone', 'Role', 'Gender', 'Actions']}>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{user.id}</td>
                                <td className="px-4 py-3">
                                    <img
                                        src={user.avatar || 'https://via.placeholder.com/50'}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-4 py-3 font-medium">{user.name}</td>
                                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                <td className="px-4 py-3 text-gray-600">{user.phone}</td>
                                <td className="px-4 py-3">
                                    <Badge variant={user.role === 'ADMIN' ? 'warning' : 'default'}>
                                        {user.role}
                                    </Badge>
                                </td>
                                <td className="px-4 py-3">{user.gender ? 'Male' : 'Female'}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="p-1.5 hover:bg-blue-50 rounded text-blue-600"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setDeleteModal({ open: true, userId: user.id })}
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

                <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedUser ? 'Edit User' : 'Add User'}>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            defaultValue={selectedUser?.name}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            defaultValue={selectedUser?.email}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                        />
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

                <Modal open={deleteModal.open} onClose={() => setDeleteModal({ open: false, userId: null })} title="Delete User">
                    <div className="space-y-4">
                        <p className="text-gray-700">Are you sure you want to delete this user?</p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="secondary" onClick={() => setDeleteModal({ open: false, userId: null })}>
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
