import type { ChangeEvent } from 'react'

export type StatusFilter = 'all' | 'upcoming' | 'completed'

export interface BookingFiltersModel {
    checkIn?: string
    checkOut?: string
    guests?: number | ''
    status?: StatusFilter
}

interface Props {
    filters: BookingFiltersModel
    onChange: (filters: BookingFiltersModel) => void
}

export default function BookingFilters({ filters, onChange }: Props) {
    const handleInput = (
        field: keyof BookingFiltersModel,
        value: BookingFiltersModel[keyof BookingFiltersModel],
    ) => {
        onChange({ ...filters, [field]: value })
    }

    const clearFilters = () => {
        onChange({
            checkIn: '',
            checkOut: '',
            guests: '',
            status: 'all',
        })
    }

    return (
        <div className='bg-white p-4 rounded-xl shadow-sm mb-4'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
                <div>
                    <label className='block text-sm text-gray-600 mb-1'>
                        Check-in
                    </label>
                    <input
                        type='date'
                        value={filters.checkIn ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInput('checkIn', e.target.value)
                        }
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>

                <div>
                    <label className='block text-sm text-gray-600 mb-1'>
                        Check-out
                    </label>
                    <input
                        type='date'
                        value={filters.checkOut ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInput('checkOut', e.target.value)
                        }
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>

                <div>
                    <label className='block text-sm text-gray-600 mb-1'>
                        Guests
                    </label>
                    <input
                        type='number'
                        min={1}
                        value={filters.guests ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInput(
                                'guests',
                                e.target.value === ''
                                    ? ''
                                    : Number(e.target.value),
                            )
                        }
                        className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                    />
                </div>

                <div className='flex items-end gap-2 md:justify-end'>
                    <div className='w-full md:w-auto'>
                        <label className='block text-sm text-gray-600 mb-1'>
                            Status
                        </label>
                        <select
                            value={filters.status ?? 'all'}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                handleInput(
                                    'status',
                                    e.target.value as StatusFilter,
                                )
                            }
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
                        >
                            <option value='all'>All</option>
                            <option value='upcoming'>Upcoming</option>
                            <option value='completed'>Completed</option>
                        </select>
                    </div>

                    <div className='w-full md:w-auto'>
                        <button
                            onClick={clearFilters}
                            className='px-3 py-2 rounded-lg border text-sm text-gray-700 hover:bg-gray-50 w-full md:w-auto'
                            type='button'
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
