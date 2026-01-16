import { Link } from 'react-router-dom'

export default function HomeHeader() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-pink-500">
                        airbnb
                    </Link>
                    <nav className="flex gap-6">
                        <Link to="/" className="hover:text-pink-500">Home</Link>
                        <Link to="/listings" className="hover:text-pink-500">Listings</Link>
                        <Link to="/my-bookings" className="hover:text-pink-500">My Bookings</Link>
                        <Link to="/profile" className="hover:text-pink-500">Profile</Link>
                        <Link to="/auth" className="hover:text-pink-500">Login</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
