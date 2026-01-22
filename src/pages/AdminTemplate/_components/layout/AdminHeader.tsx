import { Link, useNavigate } from 'react-router-dom'
import { LogOut, Shield } from 'lucide-react'

export default function AdminHeader() {
    const navigate = useNavigate()

    const handleLogout = () => {
        // TODO: Call logout API and clear Redux store
        localStorage.removeItem('access_token')
        navigate('/admin/auth')
    }

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/admin" className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="w-6 h-6" />
                        Admin Panel
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link to="/admin" className="hover:text-gray-300 transition-colors">Dashboard</Link>
                        <Link to="/admin/users" className="hover:text-gray-300 transition-colors">Users</Link>
                        <Link to="/admin/locations" className="hover:text-gray-300 transition-colors">Locations</Link>
                        <Link to="/admin/rooms" className="hover:text-gray-300 transition-colors">Rooms</Link>
                        <Link to="/admin/bookings" className="hover:text-gray-300 transition-colors">Bookings</Link>
                        <div className="border-l border-gray-600 h-6 mx-2" />
                        <Link to="/" className="hover:text-gray-300 transition-colors">Back to Site</Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
