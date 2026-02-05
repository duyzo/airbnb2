import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import { store } from './store'
import { router } from './routes'
import { useAppDispatch } from './hooks/redux'
import { meThunk } from './store/slices/authSlice'
import type { LoadingState } from './store/slices/loadingSlice'
import Loading from './components/Loading'

interface ReduxState {
  loading: LoadingState
}

function AppContent() {
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector((state: ReduxState) => state.loading)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      dispatch(meThunk())
    }
  }, [dispatch])

  return (
    <>
      {isLoading && <Loading />}
      <RouterProvider router={router} />
    </>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}
