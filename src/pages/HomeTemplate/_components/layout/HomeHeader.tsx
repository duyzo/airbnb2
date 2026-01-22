import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, LogOut, Calendar, Menu, X } from 'lucide-react'

export default function HomeHeader() {
    const navigate = useNavigate()
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    // TODO: Get from Redux store
    const isLoggedIn = false
    const user = { name: 'John Doe', avatar: 'https://via.placeholder.com/40' }

    const handleLogout = () => {
        // TODO: Call logout API and clear Redux store
        localStorage.removeItem('access_token')
        navigate('/')
    }

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-rose-500 flex items-center gap-2">
                        <span className="text-3xl">✈️</span>
                        airbnb
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
                        <Link to="/listings" className="hover:text-rose-500 transition-colors">Listings</Link>

                        {isLoggedIn ? (
                            <>
                                <Link to="/my-bookings" className="hover:text-rose-500 transition-colors flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    My Bookings
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-full border hover:shadow-md transition-shadow"
                                    >
                                        <Menu className="w-4 h-4" />
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                    </button>
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => { setShowUserMenu(false); handleLogout() }}
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/auth"
                                className="px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                            >
                                Login / Sign Up
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {showMobileMenu && (
                    <nav className="md:hidden mt-4 pb-4 border-t pt-4 space-y-2">
                        <Link to="/" className="block py-2 hover:text-rose-500" onClick={() => setShowMobileMenu(false)}>Home</Link>
                        <Link to="/listings" className="block py-2 hover:text-rose-500" onClick={() => setShowMobileMenu(false)}>Listings</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/my-bookings" className="block py-2 hover:text-rose-500" onClick={() => setShowMobileMenu(false)}>My Bookings</Link>
                                <Link to="/profile" className="block py-2 hover:text-rose-500" onClick={() => setShowMobileMenu(false)}>Profile</Link>
                                <button onClick={handleLogout} className="block py-2 text-red-600 w-full text-left">Logout</button>
                            </>
                        ) : (
                            <Link to="/auth" className="block py-2 text-rose-500 font-medium" onClick={() => setShowMobileMenu(false)}>Login / Sign Up</Link>
                        )}
                    </nav>
                )}
            </div>
        </header>
    )
}
