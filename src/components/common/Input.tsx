import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    error?: string
}

export default function Input({ label, error, className = '', ...rest }: InputProps) {
    return (
        <label className="flex flex-col gap-1 text-sm text-gray-700">
            {label && <span className="font-medium">{label}</span>}
            <input
                className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 ${className}`}
                {...rest}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </label>
    )
}
