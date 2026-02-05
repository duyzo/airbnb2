import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../../components/common/Button'
import Pagination from '../../../components/common/Pagination'
import { UserTable } from './_components/UserTable'
import { UserFilters } from './_components/UserFilters'
import { UserModal, type UserFormData } from './_components/UserModal'
import { useUserList } from '../../../hooks/apiHooks/userHooks/useUserList'
import { userService } from '../../../services/userService'
import type { User } from '../../../types'
import type { UpdateRequest, RegisterRequest } from '../../../types/user'

export default function UserManagement() {
    const { data: users = [] } = useUserList()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filterRole, setFilterRole] = useState<string>('ALL')
    const [filterGender, setFilterGender] = useState<string>('ALL')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageSize = 10

    const [modalState, setModalState] = useState<{
        open: boolean
        user: User | null
    }>({
        open: false,
        user: null,
    })

    const filteredUsers = useMemo(() => {
        return users.filter((user: User) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesRole = filterRole === 'ALL' || user.role === filterRole
            const matchesGender =
                filterGender === 'ALL' ||
                (filterGender === 'MALE' ? user.gender : !user.gender)
            return matchesSearch && matchesRole && matchesGender
        })
    }, [users, searchTerm, filterRole, filterGender])

    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return filteredUsers.slice(start, start + pageSize)
    }, [filteredUsers, currentPage])

    const totalPages = Math.ceil(filteredUsers.length / pageSize)

    const handleSaveUser = async (formData: UserFormData) => {
        try {
            if (modalState.user) {
                const updatePayload: UpdateRequest = {
                    id: modalState.user.id,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    birthday: formData.birthday,
                    gender: formData.gender,
                    role: formData.role || 'USER',
                }
                await userService.update(updatePayload)
            } else {
                const createPayload: RegisterRequest = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password || '',
                    phone: formData.phone,
                    birthday: formData.birthday,
                    gender: formData.gender,
                }
                await userService.create(createPayload)
            }
            window.location.reload()
        } catch (error) {
            console.log(error);
            
            alert('Action failed')
        }
    }

    const handleDeleteUser = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this user?'))
            return
        try {
            await userService.delete(id)
            window.location.reload()
        } catch (error) {
            console.log(error);
            
            alert('Delete failed')
        }
    }

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        User Management
                    </h1>
                    <Button
                        onClick={() =>
                            setModalState({ open: true, user: null })
                        }
                        className='bg-gray-800 text-white flex items-center'
                    >
                        <Plus className='w-5 h-5 mr-2' /> Add User
                    </Button>
                </div>

                <UserFilters
                    searchTerm={searchTerm}
                    onSearchChange={(val) => {
                        setSearchTerm(val)
                        setCurrentPage(1)
                    }}
                    filterRole={filterRole}
                    onRoleChange={(val) => {
                        setFilterRole(val)
                        setCurrentPage(1)
                    }}
                    filterGender={filterGender}
                    onGenderChange={(val) => {
                        setFilterGender(val)
                        setCurrentPage(1)
                    }}
                />

                <UserTable
                    users={paginatedUsers}
                    onEdit={(user) => setModalState({ open: true, user })}
                    onDelete={handleDeleteUser}
                />

                {totalPages > 1 && (
                    <div className='mt-6'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                <UserModal
                    isOpen={modalState.open}
                    user={modalState.user}
                    onClose={() => setModalState({ open: false, user: null })}
                    onSave={handleSaveUser}
                />
            </div>
        </div>
    )
}
