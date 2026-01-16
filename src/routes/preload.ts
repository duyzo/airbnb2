/**
 * Route Preload Utilities
 * Preload critical routes for better user experience
 */

// Preload functions for critical routes
export const preloadHomePages = () => {
    // Preload commonly accessed home pages
    import('../pages/HomeTemplate/Listing_Page')
    import('../pages/HomeTemplate/Room_Detail_Page')
}

export const preloadAuthPages = () => {
    // Preload authentication pages
    import('../pages/HomeTemplate/Auth_Page')
}

export const preloadAdminPages = () => {
    // Preload admin dashboard and common pages
    import('../pages/AdminTemplate/Admin_Dashboard')
    import('../pages/AdminTemplate/User_Management')
}

/**
 * Usage Examples:
 * 
 * 1. Preload on user hover:
 *    <Link to="/listings" onMouseEnter={preloadHomePages}>
 * 
 * 2. Preload on initial load (in App.tsx):
 *    useEffect(() => {
 *      preloadHomePages()
 *    }, [])
 * 
 * 3. Conditional preload based on user role:
 *    if (userRole === 'admin') {
 *      preloadAdminPages()
 *    }
 */
