import { Users, Home as HomeIcon, MapPin, Calendar, TrendingUp, DollarSign } from 'lucide-react'
import Card from '../../../components/common/Card'

export default function AdminDashBoard() {
    const stats = [
        {
            title: 'Total Users',
            value: '1,234',
            change: '+12.5%',
            icon: Users,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Rooms',
            value: '456',
            change: '+8.2%',
            icon: HomeIcon,
            color: 'bg-green-500',
        },
        {
            title: 'Locations',
            value: '89',
            change: '+5.1%',
            icon: MapPin,
            color: 'bg-purple-500',
        },
        {
            title: 'Bookings',
            value: '2,341',
            change: '+18.3%',
            icon: Calendar,
            color: 'bg-orange-500',
        },
        {
            title: 'Revenue',
            value: '$45,678',
            change: '+22.4%',
            icon: DollarSign,
            color: 'bg-rose-500',
        },
        {
            title: 'Growth Rate',
            value: '34.2%',
            change: '+6.7%',
            icon: TrendingUp,
            color: 'bg-indigo-500',
        },
    ]

    const recentBookings = [
        { id: 1, user: 'John Doe', room: 'Luxury Villa', date: '2024-03-15', status: 'Confirmed' },
        { id: 2, user: 'Jane Smith', room: 'Beach House', date: '2024-03-16', status: 'Pending' },
        { id: 3, user: 'Mike Johnson', room: 'City Apartment', date: '2024-03-17', status: 'Confirmed' },
        { id: 4, user: 'Sarah Wilson', room: 'Mountain Cabin', date: '2024-03-18', status: 'Confirmed' },
        { id: 5, user: 'Tom Brown', room: 'Lake House', date: '2024-03-19', status: 'Cancelled' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back, Admin!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                    {stats.map((stat) => (
                        <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`${stat.color} p-3 rounded-lg text-white`}
                                >
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Bookings */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
                        <div className="space-y-3">
                            {recentBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.user}</p>
                                        <p className="text-sm text-gray-600">{booking.room}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">{booking.date}</p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${booking.status === 'Confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : booking.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                                <Users className="w-8 h-8 text-blue-600 mb-2" />
                                <h3 className="font-semibold text-gray-800">Manage Users</h3>
                                <p className="text-sm text-gray-600">View all users</p>
                            </button>
                            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                                <HomeIcon className="w-8 h-8 text-green-600 mb-2" />
                                <h3 className="font-semibold text-gray-800">Manage Rooms</h3>
                                <p className="text-sm text-gray-600">View all rooms</p>
                            </button>
                            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                                <MapPin className="w-8 h-8 text-purple-600 mb-2" />
                                <h3 className="font-semibold text-gray-800">Manage Locations</h3>
                                <p className="text-sm text-gray-600">View all locations</p>
                            </button>
                            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors">
                                <Calendar className="w-8 h-8 text-orange-600 mb-2" />
                                <h3 className="font-semibold text-gray-800">Manage Bookings</h3>
                                <p className="text-sm text-gray-600">View all bookings</p>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
