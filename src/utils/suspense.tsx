import { Suspense } from 'react'
import type { ComponentType } from 'react'
import Loading from '../components/Loading'

/**
 * Higher Order Component for lazy loaded routes with Suspense
 * React 19 optimized implementation
 */
// eslint-disable-next-line react-refresh/only-export-components
export function withSuspense<P extends object>(
    Component: ComponentType<P>,
    FallbackComponent: ComponentType = Loading
) {
    return (props: P) => (
        <Suspense fallback={<FallbackComponent />}>
            <Component {...props} />
        </Suspense>
    )
}

/**
 * Minimal loading fallback for fast transitions
 */
export function MinimalLoading() {
    return (
        <div className="flex items-center justify-center min-h-50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
        </div>
    )
}

/**
 * Inline loading component for nested suspense boundaries
 */
export function InlineLoading() {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
    )
}
