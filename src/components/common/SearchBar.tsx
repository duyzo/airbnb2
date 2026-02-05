import {
    useState,
    useEffect,
    useRef,
    type ChangeEvent,
    type FormEvent,
} from 'react'
import { Search, MapPin, Calendar, Users, Loader2 } from 'lucide-react'
import { useLocationList } from '../../hooks/apiHooks'
import type { Location } from '../../types'

type SearchParams = {
    location: string | number
    checkIn: string
    checkOut: string
    guests: number
}

type SearchBarProps = {
    onSearch?: (params: SearchParams) => void
    variant?: 'full' | 'compact'
    className?: string
}

const removeAccents = (str: string) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()
}

export default function SearchBar({
    onSearch,
    variant = 'full',
    className = '',
}: SearchBarProps) {
    const {
        data: locations,
        loading: loadingLocations,
    } = useLocationList()

    const [formData, setFormData] = useState<SearchParams>({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
    })

    const [displayLocation, setDisplayLocation] = useState('')
    const [isLocationOpen, setIsLocationOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsLocationOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'displayLocation') {
            setDisplayLocation(value)
            setFormData((prev) => ({ ...prev, location: '' }))
            setIsLocationOpen(true)
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === 'guests' ? Number(value) : value,
            }))
        }
    }

    const handleSelectLocation = (location: Location) => {
        const displayText = `${location.tenViTri}, ${location.tinhThanh}, ${location.quocGia}`
        setDisplayLocation(displayText)
        setFormData((prev) => ({ ...prev, location: location.id }))
        setIsLocationOpen(false)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSearch?.(formData)
    }

    const filteredLocations =
        locations?.filter((item: Location) => {
            if (!displayLocation.trim()) return true

            const searchContent = removeAccents(displayLocation)
            const locationName = removeAccents(item.tenViTri)
            const province = removeAccents(item.tinhThanh)
            const country = removeAccents(item.quocGia)

            return (
                locationName.includes(searchContent) ||
                province.includes(searchContent) ||
                country.includes(searchContent)
            )
        }) || []

    const today = new Date().toISOString().split('T')[0]

    if (variant === 'compact') {
        return (
            <button
                type='button'
                className={`flex items-center gap-3 px-5 py-2.5 border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all bg-white cursor-pointer w-full md:w-auto ${className}`}
                onClick={() => console.log('Expand search logic here')}
            >
                <div className='p-2 bg-rose-500 rounded-full text-white'>
                    <Search className='w-4 h-4' />
                </div>
                <div className='flex flex-col items-start'>
                    <span className='text-sm font-semibold text-gray-900'>
                        Start your search
                    </span>
                    <span className='text-xs text-gray-500'>
                        Anywhere • Any week • Add guests
                    </span>
                </div>
            </button>
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`
                bg-white border border-gray-200 shadow-xl transition-all relative z-50 mx-auto
                flex flex-col md:flex-row items-center gap-0 md:gap-2
                rounded-3xl md:rounded-full
                p-4 md:p-1 md:pr-2
                max-w-5xl w-full
                ${className}
            `}
        >
            <div
                ref={dropdownRef}
                className='relative w-full md:w-auto flex-1 group'
            >
                <div className='px-4 py-3 md:px-6 md:py-3 hover:bg-gray-100 rounded-xl md:rounded-full cursor-pointer focus-within:bg-gray-100 transition-colors'>
                    <label className='block w-full cursor-pointer'>
                        <div className='text-xs font-bold text-gray-800 mb-1 tracking-wide'>
                            Location
                        </div>
                        <div className='flex items-center gap-2'>
                            <MapPin className='w-4 h-4 text-gray-400 shrink-0' />
                            <input
                                type='text'
                                name='displayLocation'
                                value={displayLocation}
                                onChange={handleChange}
                                onFocus={() => setIsLocationOpen(true)}
                                placeholder='Where to?'
                                className='w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-400 truncate'
                                autoComplete='off'
                            />
                        </div>
                    </label>
                </div>

                {isLocationOpen && (
                    <div className='absolute top-full left-0 mt-2 md:mt-4 w-full md:w-87.5 bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-60'>
                        {loadingLocations ? (
                            <div className='flex items-center justify-center p-4 text-gray-500 gap-2'>
                                <Loader2 className='w-5 h-5 animate-spin text-rose-500' />
                                <span className='text-sm'>Loading...</span>
                            </div>
                        ) : filteredLocations.length > 0 ? (
                            <div className='max-h-60 md:max-h-80 overflow-y-auto custom-scrollbar'>
                                {filteredLocations.map((loc: Location) => (
                                    <div
                                        key={loc.id}
                                        onClick={() =>
                                            handleSelectLocation(loc)
                                        }
                                        className='flex items-center gap-4 px-4 md:px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors'
                                    >
                                        <div className='w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0'>
                                            <img
                                                src={loc.hinhAnh}
                                                alt={loc.tenViTri}
                                                className='w-full h-full object-cover'
                                                onError={(e) => {
                                                    ;(
                                                        e.target as HTMLImageElement
                                                    ).src =
                                                        'https://via.placeholder.com/48'
                                                }}
                                            />
                                        </div>
                                        <div className='flex flex-col overflow-hidden'>
                                            <span className='text-sm font-semibold text-gray-800 truncate'>
                                                {loc.tenViTri}
                                            </span>
                                            <span className='text-xs text-gray-500 truncate'>
                                                {loc.tinhThanh}, {loc.quocGia}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='p-4 text-center text-gray-500 text-sm'>
                                No locations found
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='hidden md:block w-full h-px bg-gray-100 md:hidden my-1' />
            <div className='hidden md:block h-8 w-px bg-gray-200' />

            <div className='hidden md:flex w-full md:w-auto flex-1 relative'>
                <div className='px-4 py-3 md:px-6 md:py-3 hover:bg-gray-100 rounded-xl md:rounded-full cursor-pointer group focus-within:bg-gray-100 transition-colors'>
                    <label className='block w-full cursor-pointer'>
                        <div className='text-xs font-bold text-gray-800 mb-1 tracking-wide'>
                            Check in
                        </div>
                        <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4 text-gray-400 shrink-0' />
                            <input
                                type='date'
                                name='checkIn'
                                min={today}
                                value={formData.checkIn}
                                onChange={handleChange}
                                className='w-full bg-transparent outline-none text-sm text-gray-600 uppercase cursor-pointer'
                            />
                        </div>
                    </label>
                </div>
            </div>

            <div className='hidden md:block w-full h-px bg-gray-100 md:hidden my-1' />
            <div className='hidden md:block h-8 w-px bg-gray-200' />

            <div className='hidden md:flex w-full md:w-auto flex-1 relative'>
                <div className='px-4 py-3 md:px-6 md:py-3 hover:bg-gray-100 rounded-xl md:rounded-full cursor-pointer group focus-within:bg-gray-100 transition-colors'>
                    <label className='block w-full cursor-pointer'>
                        <div className='text-xs font-bold text-gray-800 mb-1 tracking-wide'>
                            Check out
                        </div>
                        <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4 text-gray-400 shrink-0' />
                            <input
                                type='date'
                                name='checkOut'
                                min={formData.checkIn || today}
                                value={formData.checkOut}
                                onChange={handleChange}
                                className='w-full bg-transparent outline-none text-sm text-gray-600 uppercase cursor-pointer'
                            />
                        </div>
                    </label>
                </div>
            </div>

            <div className='hidden md:block w-full h-px bg-gray-100 md:hidden my-1' />
            <div className='hidden md:block h-8 w-px bg-gray-200' />

            <div className='hidden md:flex w-full md:w-auto flex-1 relative'>
                <div className='px-4 py-3 md:px-6 md:py-3 hover:bg-gray-100 rounded-xl md:rounded-full cursor-pointer group focus-within:bg-gray-100 transition-colors'>
                    <label className='block w-full cursor-pointer'>
                        <div className='text-xs font-bold text-gray-800 mb-1 tracking-wide'>
                            Guests
                        </div>
                        <div className='flex items-center gap-2'>
                            <Users className='w-4 h-4 text-gray-400 shrink-0' />
                            <input
                                type='number'
                                name='guests'
                                min={1}
                                value={formData.guests}
                                onChange={handleChange}
                                placeholder='Add guests'
                                className='w-full bg-transparent outline-none text-sm text-gray-600 appearance-none'
                            />
                        </div>
                    </label>
                </div>
            </div>

            <div className='w-full md:w-auto p-2 mt-2 md:mt-0'>
                <button
                    type='submit'
                    className='w-full md:w-auto bg-rose-500 hover:bg-rose-600 text-white py-3 md:p-4 rounded-xl md:rounded-full transition-all shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2'
                    aria-label='Search'
                >
                    <Search className='w-5 h-5 font-bold' />
                    <span className='md:hidden font-bold text-sm uppercase tracking-wider'>
                        Search
                    </span>
                </button>
            </div>
        </form>
    )
}
