import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import Loading from './Loading'

interface AuthGuardProps {
    role?: 'ADMIN' | 'USER'
    redirectPath?: string
}

export default function AuthGuard({ role, redirectPath = '/auth' }: AuthGuardProps) {
    const location = useLocation()
    const { user, token, loading } = useAppSelector((state) => state.auth)

    if (loading) return <Loading />
    if (!token) return <Navigate to={redirectPath} replace state={{ from: location }} />
    if (role && user?.role !== role) return <Navigate to="/" replace />

    return <Outlet />
}
