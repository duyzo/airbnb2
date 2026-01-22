import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { router } from './routes'
import { useAppDispatch } from './hooks/redux'
import { meThunk } from './store/slices/authSlice'

function AppContent() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      dispatch(meThunk())
    }
  }, [dispatch])

  return <RouterProvider router={router} />
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
