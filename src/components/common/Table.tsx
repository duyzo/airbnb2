import type { TableHTMLAttributes, ReactNode } from 'react'

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
    headers: ReactNode[]
    children: ReactNode
}

export default function Table({ headers, children, className = '', ...rest }: TableProps) {
    return (
        <div className="overflow-x-auto">
            <table className={`min-w-full text-sm text-left ${className}`} {...rest}>
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map((h, idx) => (
                            <th key={idx} className="px-4 py-3 font-semibold text-gray-700">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">{children}</tbody>
            </table>
        </div>
    )
}
