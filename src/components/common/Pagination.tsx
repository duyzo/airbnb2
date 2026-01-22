import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    // Show max 7 pages
    let visiblePages = pages
    if (totalPages > 7) {
        if (currentPage <= 4) {
            visiblePages = [...pages.slice(0, 5), -1, totalPages]
        } else if (currentPage >= totalPages - 3) {
            visiblePages = [1, -1, ...pages.slice(totalPages - 5)]
        } else {
            visiblePages = [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages]
        }
    }

    return (
        <div className="flex items-center justify-center gap-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {visiblePages.map((page, idx) =>
                page === -1 ? (
                    <span key={`ellipsis-${idx}`} className="px-3 py-2">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-2 rounded ${currentPage === page
                                ? 'bg-rose-500 text-white'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    )
}
