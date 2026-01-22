import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
    hover?: boolean
}

export default function Card({ children, hover = false, className = '', ...rest }: CardProps) {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${hover ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : ''
                } ${className}`}
            {...rest}
        >
            {children}
        </div>
    )
}
