import { useState, useEffect, useRef, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    Search,
    SlidersHorizontal,
    MapPin,
    Calendar,
    Loader2,
    X,
} from 'lucide-react'
import { useLocationList } from '../../../../hooks/apiHooks'
import type { Location } from '../../../../types'

interface CompactFilterBarProps {
    onOpenFilter: () => void
}

const removeAccents = (str: string) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
}

export default function CompactFilterBar({
    onOpenFilter,
}: CompactFilterBarProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { data: locations, loading: loadingLocations } = useLocationList()

    // -- State --
    const [locationId, setLocationId] = useState<string>(
        searchParams.get('location') || '',
    )
    const [checkIn, setCheckIn] = useState<string>(
        searchParams.get('checkIn') || '',
    )
    const [checkOut, setCheckOut] = useState<string>(
        searchParams.get('checkOut') || '',
    )
    const [guests, setGuests] = useState<number>(
        Number(searchParams.get('guests')) || 0,
    )

    const [activePopup, setActivePopup] = useState<
        'location' | 'dates' | 'guests' | null
    >(null)
    const [searchLocationKeyword, setSearchLocationKeyword] = useState('')
    const popupRef = useRef<HTMLDivElement>(null)

    // -- Effects --
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setActivePopup(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // -- Helpers --
    const getCurrentLocation = () => {
        if (!locationId || !locations) return ''
        const location = locations.find(
            (loc: Location) => loc.id.toString() === locationId,
        )
        return location ? `${location.tenViTri}, ${location.tinhThanh}` : ''
    }

    const handleSelectLocation = (loc: Location) => {
        setLocationId(loc.id.toString())
        setActivePopup(null)
    }

    const handleClearLocation = (e: React.MouseEvent) => {
        e.stopPropagation()
        setLocationId('')
        setSearchLocationKeyword('')
    }

    const handleSearch = () => {
        const newParams = new URLSearchParams(searchParams)

        if (locationId) newParams.set('location', locationId)
        else newParams.delete('location')

        if (checkIn) newParams.set('checkIn', checkIn)
        else newParams.delete('checkIn')

        if (checkOut) newParams.set('checkOut', checkOut)
        else newParams.delete('checkOut')

        if (guests > 0) newParams.set('guests', guests.toString())
        else newParams.delete('guests')

        newParams.set('page', '1')
        setSearchParams(newParams)
        setActivePopup(null)
    }

    const filteredLocations = useMemo(() => {
        if (!locations) return []
        if (!searchLocationKeyword.trim()) return locations
        const keyword = removeAccents(searchLocationKeyword)
        return locations.filter((loc: Location) => {
            const name = removeAccents(loc.tenViTri)
            const city = removeAccents(loc.tinhThanh)
            return name.includes(keyword) || city.includes(keyword)
        })
    }, [locations, searchLocationKeyword])

    // -- Render Props --
    const displayLocation = getCurrentLocation() || 'Anywhere'
    const displayDates =
        checkIn && checkOut ? `${checkIn} - ${checkOut}` : 'Add dates'
    const displayGuests =
        guests > 0 ? `${guests} guest${guests > 1 ? 's' : ''}` : 'Add guests'
    const today = new Date().toISOString().split('T')[0]

    return (
        <div className='flex items-center justify-center gap-2 md:gap-3 w-full relative z-50'>
            {/* Search Capsule */}
            <div
                ref={popupRef}
                className='flex items-center bg-white rounded-full border shadow-sm hover:shadow-md transition-shadow p-2 gap-0 divide-x divide-gray-200 relative'
            >
                {/* 1. Location (Always Visible) */}
                <div className='relative'>
                    <button
                        onClick={() =>
                            setActivePopup(
                                activePopup === 'location' ? null : 'location',
                            )
                        }
                        className={`flex flex-col items-start rounded-full px-3 md:px-6 py-2 md:min-w-48 transition-colors hover:bg-gray-100 ${activePopup === 'location' ? 'bg-gray-100' : ''}`}
                    >
                        <span className='text-xs font-bold text-gray-800'>
                            Location
                        </span>
                        <span
                            className={`text-sm truncate max-w-36 md:max-w-none ${!locationId ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            {displayLocation}
                        </span>
                    </button>

                    {/* Location Popover */}
                    {activePopup === 'location' && (
                        <div className='absolute top-full left-0 z-50 mt-4 w-[80vw] md:w-80 overflow-hidden rounded-3xl border border-gray-100 bg-white py-4 shadow-xl animate-in fade-in zoom-in duration-200'>
                            <div className='px-4 mb-2'>
                                <div className='flex items-center bg-gray-100 rounded-xl px-3 py-2'>
                                    <MapPin className='w-4 h-4 text-gray-500 mr-2 shrink-0' />
                                    <input
                                        type='text'
                                        placeholder='Search...'
                                        className='w-full border-none bg-transparent text-sm outline-none'
                                        value={searchLocationKeyword}
                                        onChange={(e) =>
                                            setSearchLocationKeyword(
                                                e.target.value,
                                            )
                                        }
                                        autoFocus
                                    />
                                    {locationId && (
                                        <button onClick={handleClearLocation}>
                                            <X className='w-4 h-4 text-gray-400 hover:text-gray-600' />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className='max-h-60 overflow-y-auto custom-scrollbar'>
                                {loadingLocations ? (
                                    <div className='flex justify-center p-4 text-gray-500 text-sm gap-2'>
                                        <Loader2 className='w-4 h-4 animate-spin' />
                                    </div>
                                ) : filteredLocations.length > 0 ? (
                                    filteredLocations.map((loc: Location) => (
                                        <div
                                            key={loc.id}
                                            onClick={() =>
                                                handleSelectLocation(loc)
                                            }
                                            className='flex items-center gap-3 px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors'
                                        >
                                            <div className='w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-lg overflow-hidden shrink-0'>
                                                <img
                                                    src={loc.hinhAnh}
                                                    alt={loc.tenViTri}
                                                    className='w-full h-full object-cover'
                                                    onError={(e) =>
                                                        ((
                                                            e.target as HTMLImageElement
                                                        ).src =
                                                            'https://via.placeholder.com/40')
                                                    }
                                                />
                                            </div>
                                            <div className='flex flex-col overflow-hidden'>
                                                <span className='text-sm font-medium text-gray-900 truncate'>
                                                    {loc.tenViTri}
                                                </span>
                                                <span className='text-xs text-gray-500 truncate'>
                                                    {loc.tinhThanh}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='p-4 text-sm text-center text-gray-400'>
                                        No destinations found
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Dates (Hidden on Mobile) */}
                <div className='relative hidden md:block'>
                    <button
                        onClick={() =>
                            setActivePopup(
                                activePopup === 'dates' ? null : 'dates',
                            )
                        }
                        className={`flex flex-col items-start min-w-45 rounded-full px-6 py-2 transition-colors hover:bg-gray-100 ${activePopup === 'dates' ? 'bg-gray-100' : ''}`}
                    >
                        <span className='text-xs font-bold text-gray-800'>
                            Check-in - Check-out
                        </span>
                        <span
                            className={`text-sm truncate ${!checkIn ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                            {displayDates}
                        </span>
                    </button>
                    {activePopup === 'dates' && (
                        <div className='absolute top-full left-1/2 z-50 -translate-x-1/2 mt-4 w-[320px] rounded-3xl border border-gray-100 bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200'>
                            <div className='flex flex-col gap-4'>
                                <div className='space-y-1'>
                                    <label className='ml-1 text-xs font-bold text-gray-600'>
                                        Check-in
                                    </label>
                                    <div className='flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-black'>
                                        <Calendar className='w-4 h-4 text-gray-400 mr-2' />
                                        <input
                                            type='date'
                                            min={today}
                                            value={checkIn}
                                            onChange={(e) =>
                                                setCheckIn(e.target.value)
                                            }
                                            className='w-full border-none text-sm outline-none'
                                        />
                                    </div>
                                </div>
                                <div className='space-y-1'>
                                    <label className='ml-1 text-xs font-bold text-gray-600'>
                                        Check-out
                                    </label>
                                    <div className='flex items-center border rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-black'>
                                        <Calendar className='w-4 h-4 text-gray-400 mr-2' />
                                        <input
                                            type='date'
                                            min={checkIn || today}
                                            value={checkOut}
                                            onChange={(e) =>
                                                setCheckOut(e.target.value)
                                            }
                                            className='w-full border-none text-sm outline-none'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Guests (Hidden on Mobile) & Search Button */}
                <div className='relative flex items-center'>
                    <div className='hidden md:block'>
                        <button
                            onClick={() =>
                                setActivePopup(
                                    activePopup === 'guests' ? null : 'guests',
                                )
                            }
                            className={`flex flex-col items-start md:min-w-40 rounded-full px-6 py-2 transition-colors hover:bg-gray-100 ${activePopup === 'guests' ? 'bg-gray-100' : ''}`}
                        >
                            <span className='text-xs font-bold text-gray-800'>
                                Guests
                            </span>
                            <span
                                className={`text-sm ${guests === 0 ? 'text-gray-400' : 'text-gray-600'}`}
                            >
                                {displayGuests}
                            </span>
                        </button>
                    </div>

                    <button
                        onClick={handleSearch}
                        className='bg-rose-500 text-white p-3 rounded-full hover:bg-rose-600 transition-transform active:scale-95 shadow-md ml-2'
                        aria-label='Search'
                    >
                        <Search className='w-4 h-4 font-bold' />
                    </button>

                    {activePopup === 'guests' && (
                        <div className='absolute top-full right-0 mt-4 w-75 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 z-50 animate-in fade-in zoom-in duration-200'>
                            <div className='flex items-center justify-between'>
                                <div className='flex flex-col'>
                                    <span className='font-semibold text-gray-800'>
                                        Adults
                                    </span>
                                    <span className='text-sm text-gray-500'>
                                        Age 13+
                                    </span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <button
                                        onClick={() =>
                                            setGuests(Math.max(0, guests - 1))
                                        }
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center hover:border-black ${guests === 0 ? 'opacity-30' : ''}`}
                                        disabled={guests === 0}
                                    >
                                        -
                                    </button>
                                    <span className='w-4 text-center font-medium'>
                                        {guests}
                                    </span>
                                    <button
                                        onClick={() => setGuests(guests + 1)}
                                        className='w-8 h-8 rounded-full border flex items-center justify-center hover:border-black'
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Filter Button (Icon only on mobile) */}
            <button
                onClick={onOpenFilter}
                className='flex items-center gap-2 px-3 md:px-4 py-3 border border-gray-300 rounded-full md:rounded-xl hover:border-black bg-white transition-colors shrink-0'
            >
                <SlidersHorizontal className='w-4 h-4' />
                <span className='hidden md:inline text-sm font-medium'>
                    Filters
                </span>
            </button>
        </div>
    )
}
