export default function HomeFooter() {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="container mx-auto px-4 py-6">
                <div className="text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Airbnb Clone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
