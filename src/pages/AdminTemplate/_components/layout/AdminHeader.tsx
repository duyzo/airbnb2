import { Link } from 'react-router-dom'

export default function AdminHeader() {
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/admin" className="text-2xl font-bold">
                        Admin Panel
                    </Link>
                    <nav className="flex gap-6">
                        <Link to="/admin" className="hover:text-gray-300">Dashboard</Link>
                        <Link to="/admin/users" className="hover:text-gray-300">Users</Link>
                        <Link to="/admin/locations" className="hover:text-gray-300">Locations</Link>
                        <Link to="/admin/rooms" className="hover:text-gray-300">Rooms</Link>
                        <Link to="/admin/bookings" className="hover:text-gray-300">Bookings</Link>
                        <Link to="/" className="hover:text-gray-300">Back to Site</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
