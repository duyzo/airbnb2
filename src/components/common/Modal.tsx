import type { HTMLAttributes, ReactNode } from 'react'

type ModalProps = HTMLAttributes<HTMLDivElement> & {
    open: boolean
    title?: string
    children: ReactNode
    onClose: () => void
}

export default function Modal({ open, title, children, onClose, ...rest }: ModalProps) {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4" role="dialog" aria-modal="true" {...rest}>
                <div className="flex items-center justify-between mb-3">
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                    <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                {children}
            </div>
        </div>
    )
}
