export default function AdminFooter() {
    return (
        <footer className="bg-gray-800 text-white border-t border-gray-700">
            <div className="container mx-auto px-4 py-6">
                <div className="text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Airbnb Admin Panel</p>
                </div>
            </div>
        </footer>
    )
}
