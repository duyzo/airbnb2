import { Outlet } from 'react-router-dom'
import HomeHeader from './_components/layout/HomeHeader'
import HomeFooter from './_components/layout/HomeFooter'

//    Chức năng: Hiển thị thanh tìm kiếm, danh sách các địa điểm nổi bật, banner.

// API cần dùng:

// GET /api/vi-tri: Lấy danh sách vị trí để hiển thị slider hoặc grid các điểm đến.

// GET /api/phong-thue/phan-trang-tim-kiem: Hiển thị một số phòng gợi ý (nếu cần).
export default function HomeTemplate() {
    return (
        <div className="min-h-screen flex flex-col">
            <HomeHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <HomeFooter />
        </div>
    )
}
