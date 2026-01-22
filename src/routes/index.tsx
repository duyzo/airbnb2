import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Loading from '../components/Loading'
import AuthGuard from '../components/AuthGuard'

// Lazy load Templates
const HomeTemplate = lazy(() => import('../pages/HomeTemplate'))
const AdminTemplate = lazy(() => import('../pages/AdminTemplate'))
const NotFound = lazy(() => import('../pages/NotFound'))

// Lazy load Home Template Pages
const Home = lazy(() => import('../pages/HomeTemplate/Home'))
const AuthPage = lazy(() => import('../pages/HomeTemplate/Auth_Page'))
const ListingPage = lazy(() => import('../pages/HomeTemplate/Listing_Page'))
const MyBookings = lazy(() => import('../pages/HomeTemplate/My_Bookings'))
const RoomDetailPage = lazy(() => import('../pages/HomeTemplate/Room_Detail_Page'))
const UserProfile = lazy(() => import('../pages/HomeTemplate/User_Profile'))

// Lazy load Admin Template Pages
const AdminDashboard = lazy(() => import('../pages/AdminTemplate/Admin_Dashboard'))
const AdminAuth = lazy(() => import('../pages/AdminTemplate/Auth'))
const BookingManagement = lazy(() => import('../pages/AdminTemplate/Booking_Management'))
const LocationManagement = lazy(() => import('../pages/AdminTemplate/Location_Management'))
const RoomManagement = lazy(() => import('../pages/AdminTemplate/Room_Management'))
const UserManagement = lazy(() => import('../pages/AdminTemplate/User_Management'))

// Wrapper component for Suspense
// eslint-disable-next-line react-refresh/only-export-components
function SuspenseWrapper({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <SuspenseWrapper>
                <HomeTemplate />
            </SuspenseWrapper>
        ),
        children: [
            {
                index: true,
                element: (
                    <SuspenseWrapper>
                        <Home />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'auth',
                element: (
                    <SuspenseWrapper>
                        <AuthPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'listings',
                element: (
                    <SuspenseWrapper>
                        <ListingPage />
                    </SuspenseWrapper>
                ),
            },
            {
                path: 'room/:id',
                element: (
                    <SuspenseWrapper>
                        <RoomDetailPage />
                    </SuspenseWrapper>
                ),
            },
            {
                element: (
                    <SuspenseWrapper>
                        <AuthGuard />
                    </SuspenseWrapper>
                ),
                children: [
                    {
                        path: 'my-bookings',
                        element: (
                            <SuspenseWrapper>
                                <MyBookings />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'profile',
                        element: (
                            <SuspenseWrapper>
                                <UserProfile />
                            </SuspenseWrapper>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: '/admin/auth',
        element: (
            <SuspenseWrapper>
                <AdminAuth />
            </SuspenseWrapper>
        ),
    },
    {
        path: '/admin',
        element: (
            <SuspenseWrapper>
                <AuthGuard role="ADMIN" redirectPath="/admin/auth" />
            </SuspenseWrapper>
        ),
        children: [
            {
                element: (
                    <SuspenseWrapper>
                        <AdminTemplate />
                    </SuspenseWrapper>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <SuspenseWrapper>
                                <AdminDashboard />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'auth',
                        element: (
                            <SuspenseWrapper>
                                <AdminAuth />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'bookings',
                        element: (
                            <SuspenseWrapper>
                                <BookingManagement />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'locations',
                        element: (
                            <SuspenseWrapper>
                                <LocationManagement />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'rooms',
                        element: (
                            <SuspenseWrapper>
                                <RoomManagement />
                            </SuspenseWrapper>
                        ),
                    },
                    {
                        path: 'users',
                        element: (
                            <SuspenseWrapper>
                                <UserManagement />
                            </SuspenseWrapper>
                        ),
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: (
            <SuspenseWrapper>
                <NotFound />
            </SuspenseWrapper>
        ),
    },
])
