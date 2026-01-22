import { Outlet } from 'react-router-dom'
import AdminHeader from './_components/layout/AdminHeader'
import AdminFooter from './_components/layout/AdminFooter'

export default function AdminTemplate() {
    return (
        <div className="min-h-screen flex flex-col">
            <AdminHeader />
            <main className="grow">
                <Outlet />
            </main>
            <AdminFooter />
        </div>
    )
}
