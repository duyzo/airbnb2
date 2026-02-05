import { useState, useEffect } from 'react'
import {
    X,
    Minus,
    Plus,
    Wifi,
    Wind,
    Tv,
    Car,
    Waves,
    Utensils,
    Droplets,
    Shirt,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

const AMENITIES_CONFIG = [
    { key: 'wifi', label: 'WiFi', icon: Wifi },
    { key: 'hoBoi', label: 'Pool', icon: Waves },
    { key: 'dieuHoa', label: 'AC', icon: Wind },
    { key: 'tivi', label: 'TV', icon: Tv },
    { key: 'doXe', label: 'Parking', icon: Car },
    { key: 'bep', label: 'Kitchen', icon: Utensils },
    { key: 'mayGiat', label: 'Washer', icon: Droplets },
    { key: 'banLa', label: 'Iron', icon: Shirt },
]

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
    const [counts, setCounts] = useState({
        phongNgu: 0,
        giuong: 0,
        phongTam: 0,
    })
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

    useEffect(() => {
        if (isOpen) {
            setPriceRange({
                min: Number(searchParams.get('minPrice')) || 0,
                max: Number(searchParams.get('maxPrice')) || 1000,
            })
            setCounts({
                phongNgu: Number(searchParams.get('rooms')) || 0,
                giuong: Number(searchParams.get('beds')) || 0,
                phongTam: Number(searchParams.get('bathrooms')) || 0,
            })
            const amenitiesParam = searchParams.get('amenities')
            setSelectedAmenities(
                amenitiesParam ? amenitiesParam.split(',') : [],
            )
        }
    }, [isOpen, searchParams])

    const handleCountChange = (key: keyof typeof counts, value: number) => {
        setCounts((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + value),
        }))
    }

    const toggleAmenity = (key: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
        )
    }

    const handleClearAll = () => {
        setPriceRange({ min: 0, max: 1000 })
        setCounts({ phongNgu: 0, giuong: 0, phongTam: 0 })
        setSelectedAmenities([])
    }

    const handleSubmit = () => {
        const newParams = new URLSearchParams(searchParams)
        if (priceRange.min > 0)
            newParams.set('minPrice', priceRange.min.toString())
        else newParams.delete('minPrice')

        if (priceRange.max < 1000)
            newParams.set('maxPrice', priceRange.max.toString())
        else newParams.delete('maxPrice')

        Object.entries(counts).forEach(([key, val]) => {
            if (val > 0)
                newParams.set(
                    key === 'phongNgu'
                        ? 'rooms'
                        : key === 'giuong'
                          ? 'beds'
                          : 'bathrooms',
                    val.toString(),
                )
            else
                newParams.delete(
                    key === 'phongNgu'
                        ? 'rooms'
                        : key === 'giuong'
                          ? 'beds'
                          : 'bathrooms',
                )
        })

        if (selectedAmenities.length > 0)
            newParams.set('amenities', selectedAmenities.join(','))
        else newParams.delete('amenities')

        newParams.set('page', '1')
        setSearchParams(newParams)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-10 flex items-end sm:items-center justify-center bg-black/50 sm:p-4'>
            {/* Modal Container: Fullscreen on mobile, Rounded Card on Desktop */}
            <div className='bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-2xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 sm:fade-in sm:zoom-in duration-200'>
                {/* Header */}
                <div className='flex items-center justify-between p-4 border-b'>
                    <button
                        onClick={onClose}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    >
                        <X className='w-5 h-5' />
                    </button>
                    <h2 className='text-lg font-bold'>Filters</h2>
                    <div className='w-9'></div>
                </div>

                {/* Scrollable Body */}
                <div className='flex-1 overflow-y-auto p-6 space-y-8'>
                    {/* Price */}
                    <section>
                        <h3 className='text-xl font-semibold mb-4'>
                            Price range ($)
                        </h3>
                        <div className='flex items-center gap-4'>
                            <div className='border rounded-xl px-4 py-2 flex-1 relative'>
                                <label className='text-xs text-gray-500 absolute top-1'>
                                    Min
                                </label>
                                <input
                                    type='number'
                                    value={priceRange.min}
                                    onChange={(e) =>
                                        setPriceRange((p) => ({
                                            ...p,
                                            min: Number(e.target.value),
                                        }))
                                    }
                                    className='w-full mt-4 outline-none font-medium'
                                />
                            </div>
                            <span className='text-gray-400'>-</span>
                            <div className='border rounded-xl px-4 py-2 flex-1 relative'>
                                <label className='text-xs text-gray-500 absolute top-1'>
                                    Max
                                </label>
                                <input
                                    type='number'
                                    value={priceRange.max}
                                    onChange={(e) =>
                                        setPriceRange((p) => ({
                                            ...p,
                                            max: Number(e.target.value),
                                        }))
                                    }
                                    className='w-full mt-4 outline-none font-medium'
                                />
                            </div>
                        </div>
                    </section>
                    <div className='h-px bg-gray-200' />

                    {/* Rooms/Beds */}
                    <section>
                        <h3 className='text-xl font-semibold mb-4'>
                            Rooms and beds
                        </h3>
                        <div className='space-y-6'>
                            {[
                                { k: 'phongNgu', l: 'Bedrooms' },
                                { k: 'giuong', l: 'Beds' },
                                { k: 'phongTam', l: 'Bathrooms' },
                            ].map((item) => (
                                <div
                                    key={item.k}
                                    className='flex items-center justify-between'
                                >
                                    <span className='text-gray-700 text-base'>
                                        {item.l}
                                    </span>
                                    <div className='flex items-center gap-4'>
                                        <button
                                            onClick={() =>
                                                handleCountChange(
                                                    item.k as keyof typeof counts,
                                                    -1,
                                                )
                                            }
                                            disabled={
                                                counts[
                                                    item.k as keyof typeof counts
                                                ] === 0
                                            }
                                            className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black disabled:opacity-30'
                                        >
                                            <Minus className='w-4 h-4' />
                                        </button>
                                        <span className='w-4 text-center'>
                                            {counts[
                                                item.k as keyof typeof counts
                                            ] || '0+'}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleCountChange(
                                                    item.k as keyof typeof counts,
                                                    1,
                                                )
                                            }
                                            className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-black'
                                        >
                                            <Plus className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <div className='h-px bg-gray-200' />

                    {/* Amenities */}
                    <section>
                        <h3 className='text-xl font-semibold mb-4'>
                            Amenities
                        </h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {AMENITIES_CONFIG.map(
                                ({ key, label, icon: Icon }) => (
                                    <label
                                        key={key}
                                        className='flex items-center gap-3 cursor-pointer group'
                                    >
                                        <input
                                            type='checkbox'
                                            checked={selectedAmenities.includes(
                                                key,
                                            )}
                                            onChange={() => toggleAmenity(key)}
                                            className='h-5 w-5 rounded border-gray-300 text-black focus:ring-black'
                                        />
                                        <span className='text-gray-700 flex items-center gap-2'>
                                            <Icon className='w-4 h-4 text-gray-500' />{' '}
                                            {label}
                                        </span>
                                    </label>
                                ),
                            )}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className='p-4 border-t flex items-center justify-between bg-white sm:rounded-b-2xl pb-safe'>
                    <button
                        onClick={handleClearAll}
                        className='font-semibold text-gray-900 underline hover:text-gray-600 px-2'
                    >
                        Clear all
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold active:scale-95'
                    >
                        Show results
                    </button>
                </div>
            </div>
        </div>
    )
}
