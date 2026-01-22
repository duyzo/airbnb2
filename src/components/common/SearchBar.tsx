import { Search, MapPin, Calendar, Users } from 'lucide-react'

type SearchBarProps = {
    onSearch?: (params: { location: string; checkIn: string; checkOut: string; guests: number }) => void
    variant?: 'full' | 'compact'
}

export default function SearchBar({ onSearch, variant = 'full' }: SearchBarProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const params = {
            location: formData.get('location') as string,
            checkIn: formData.get('checkIn') as string,
            checkOut: formData.get('checkOut') as string,
            guests: Number(formData.get('guests')),
        }
        onSearch?.(params)
    }

    if (variant === 'compact') {
        return (
            <div className="flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm hover:shadow-md transition-shadow bg-white cursor-pointer">
                <Search className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium">Start your search</span>
            </div>
        )
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center gap-4 max-w-4xl mx-auto"
        >
            <div className="flex-1 px-4 py-2 border-r">
                <label className="block">
                    <div className="text-xs font-semibold mb-1">Location</div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            name="location"
                            placeholder="Where are you going?"
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </label>
            </div>

            <div className="flex-1 px-4 py-2 border-r">
                <label className="block">
                    <div className="text-xs font-semibold mb-1">Check in</div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <input type="date" name="checkIn" className="w-full outline-none text-sm" />
                    </div>
                </label>
            </div>

            <div className="flex-1 px-4 py-2 border-r">
                <label className="block">
                    <div className="text-xs font-semibold mb-1">Check out</div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <input type="date" name="checkOut" className="w-full outline-none text-sm" />
                    </div>
                </label>
            </div>

            <div className="flex-1 px-4 py-2">
                <label className="block">
                    <div className="text-xs font-semibold mb-1">Guests</div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <input
                            type="number"
                            name="guests"
                            min="1"
                            defaultValue="1"
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </label>
            </div>

            <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-full transition-colors"
                aria-label="Search"
            >
                <Search className="w-5 h-5" />
            </button>
        </form>
    )
}
