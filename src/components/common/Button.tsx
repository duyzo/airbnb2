type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
    const base = 'px-4 py-2 rounded font-semibold transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
    const variants: Record<string, string> = {
        primary: 'bg-rose-500 text-white hover:bg-rose-600 disabled:hover:bg-rose-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:hover:bg-gray-200',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 disabled:hover:bg-transparent',
    }
    return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
