import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

type ErrorBoundaryProps = { children: ReactNode }
type ErrorBoundaryState = { hasError: boolean }

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="bg-white p-6 rounded shadow text-center space-y-3">
                        <h2 className="text-xl font-semibold text-gray-800">Đã xảy ra lỗi</h2>
                        <p className="text-gray-600">Vui lòng tải lại trang hoặc thử lại sau.</p>
                        <button
                            className="px-4 py-2 rounded bg-rose-500 text-white hover:bg-rose-600"
                            onClick={() => window.location.reload()}
                        >
                            Tải lại trang
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
