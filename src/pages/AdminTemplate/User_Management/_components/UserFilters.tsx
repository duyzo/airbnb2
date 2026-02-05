import { Search, Filter } from 'lucide-react'

interface Props {
    searchTerm: string
    onSearchChange: (value: string) => void
    filterRole: string
    onRoleChange: (value: string) => void
    filterGender: string
    onGenderChange: (value: string) => void
}

export const UserFilters = ({
    searchTerm,
    onSearchChange,
    filterRole,
    onRoleChange,
    filterGender,
    onGenderChange,
}: Props) => {
    return (
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8'>
            <div className='relative flex-1 max-w-md'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder='Search by name or email...'
                    className='w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-gray-800 bg-white'
                />
            </div>

            <div className='flex flex-wrap items-center gap-3'>
                <div className='flex items-center gap-2 bg-white px-3 py-2 border rounded-lg'>
                    <Filter className='w-4 h-4 text-gray-500' />
                    <select
                        value={filterRole}
                        onChange={(e) => onRoleChange(e.target.value)}
                        className='focus:outline-none text-sm font-medium bg-transparent'
                    >
                        <option value='ALL'>All Roles</option>
                        <option value='ADMIN'>Admin</option>
                        <option value='USER'>User</option>
                    </select>
                </div>

                <div className='flex items-center gap-2 bg-white px-3 py-2 border rounded-lg'>
                    <select
                        value={filterGender}
                        onChange={(e) => onGenderChange(e.target.value)}
                        className='focus:outline-none text-sm font-medium bg-transparent'
                    >
                        <option value='ALL'>All Genders</option>
                        <option value='MALE'>Male</option>
                        <option value='FEMALE'>Female</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
