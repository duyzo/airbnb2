import type { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    error?: string
    options: Array<{ value: string | number; label: string }>
}

export default function Select({ label, error, options, className = '', ...rest }: SelectProps) {
    return (
        <label className="flex flex-col gap-1 text-sm text-gray-700">
            {label && <span className="font-medium">{label}</span>}
            <select
                className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white ${className}`}
                {...rest}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </label>
    )
}
