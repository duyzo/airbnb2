import { Star } from 'lucide-react'

type RatingStarsProps = {
    rating: number
    maxRating?: number
    size?: number
    showNumber?: boolean
    interactive?: boolean
    onRatingChange?: (rating: number) => void
}

export default function RatingStars({
    rating,
    maxRating = 5,
    size = 16,
    showNumber = false,
    interactive = false,
    onRatingChange,
}: RatingStarsProps) {
    const handleClick = (value: number) => {
        if (interactive && onRatingChange) {
            onRatingChange(value)
        }
    }

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((value) => (
                <Star
                    key={value}
                    size={size}
                    className={`${value <= rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        } ${interactive ? 'cursor-pointer hover:fill-yellow-300 hover:text-yellow-300' : ''}`}
                    onClick={() => handleClick(value)}
                />
            ))}
            {showNumber && <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>}
        </div>
    )
}
