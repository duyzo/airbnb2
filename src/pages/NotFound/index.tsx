import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
                <Link
                    to="/"
                    className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}
