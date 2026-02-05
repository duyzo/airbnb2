import { useState } from 'react'
import ImageGallery from '../../../../components/common/ImageGallery'

interface RoomImagesProps {
    images: string[]
}

export default function RoomImages({ images }: RoomImagesProps) {
    const [showGallery, setShowGallery] = useState(false)

    return (
        <>
            <ImageGallery
                images={images}
                open={showGallery}
                onClose={() => setShowGallery(false)}
            />
            <div className='container mx-auto px-4 py-6'>
                <div className='grid grid-cols-4 gap-2 rounded-xl overflow-hidden max-h-125'>
                    <div
                        className='col-span-2 row-span-2 cursor-pointer relative group'
                        onClick={() => setShowGallery(true)}
                    >
                        <img
                            src={images[0]}
                            alt='Main'
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors' />
                    </div>
                    {images.slice(1, 5).map((img, idx) => (
                        <div
                            key={idx}
                            className='cursor-pointer relative group'
                            onClick={() => setShowGallery(true)}
                        >
                            <img
                                src={img}
                                alt={`Gallery ${idx + 2}`}
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors' />
                            {idx === 3 && (
                                <div className='absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-lg'>
                                    View All Photos
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
