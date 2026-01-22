import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

type ImageGalleryProps = {
    images: string[]
    open: boolean
    onClose: () => void
    initialIndex?: number
}

export default function ImageGallery({ images, open, onClose, initialIndex = 0 }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    if (!open) return null

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') goToPrevious()
        if (e.key === 'ArrowRight') goToNext()
        if (e.key === 'Escape') onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                aria-label="Close gallery"
            >
                <X size={32} />
            </button>

            <button
                onClick={goToPrevious}
                className="absolute left-4 text-white hover:text-gray-300 p-2 rounded-full bg-black/30 hover:bg-black/50"
                aria-label="Previous image"
            >
                <ChevronLeft size={32} />
            </button>

            <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="max-w-[90vw] max-h-[90vh] object-contain"
            />

            <button
                onClick={goToNext}
                className="absolute right-4 text-white hover:text-gray-300 p-2 rounded-full bg-black/30 hover:bg-black/50"
                aria-label="Next image"
            >
                <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    )
}
