import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { LogIn, UserPlus, Mail, Lock, User, Phone, Calendar } from 'lucide-react'
import Button from '../../../components/common/Button'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { loginThunk, registerThunk } from '../../../store/slices/authSlice'
import type { LoginRequest, RegisterRequest } from '../../../types'

const loginSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

const registerSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: yup.string().required('Phone is required'),
    birthday: yup.string().required('Birthday is required'),
    gender: yup.boolean().required('Gender is required'),
})

export default function AuthPage() {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { loading, error } = useAppSelector(state => state.auth)

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm<LoginRequest>({
        resolver: yupResolver(loginSchema),
    })

    const {
        register: registerSignup,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm<RegisterRequest>({
        resolver: yupResolver(registerSchema),
    })

    const onLogin = async (data: LoginRequest) => {
        try {
            await dispatch(loginThunk(data)).unwrap()
            navigate('/')
        } catch (err) {
            console.error('Login failed:', err)
        }
    }

    const onRegister = async (data: RegisterRequest) => {
        try {
            await dispatch(registerThunk(data)).unwrap()
            // After signup, switch to login tab
            setMode('login')
            alert('Registration successful! Please login.')
        } catch (err) {
            console.error('Register failed:', err)
        }
    }

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex gap-4 mb-8 border-b">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-3 font-semibold transition-colors relative ${mode === 'login'
                                ? 'text-rose-500'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <LogIn className="w-5 h-5" />
                                <span>Login</span>
                            </div>
                            {mode === 'login' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />
                            )}
                        </button>
                        <button
                            onClick={() => setMode('register')}
                            className={`flex-1 py-3 font-semibold transition-colors relative ${mode === 'register'
                                ? 'text-rose-500'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <UserPlus className="w-5 h-5" />
                                <span>Register</span>
                            </div>
                            {mode === 'register' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500" />
                            )}
                        </button>
                    </div>

                    {/* Login Form */}
                    {mode === 'login' && (
                        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        {...registerLogin('email')}
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                </div>
                                {loginErrors.email && (
                                    <p className="text-xs text-red-500 mt-1">{loginErrors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        {...registerLogin('password')}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                </div>
                                {loginErrors.password && (
                                    <p className="text-xs text-red-500 mt-1">{loginErrors.password.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    )}

                    {/* Register Form */}
                    {mode === 'register' && (
                        <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        {...registerSignup('name')}
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                </div>
                                {registerErrors.name && (
                                    <p className="text-xs text-red-500 mt-1">{registerErrors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        {...registerSignup('email')}
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                </div>
                                {registerErrors.email && (
                                    <p className="text-xs text-red-500 mt-1">{registerErrors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        {...registerSignup('password')}
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                </div>
                                {registerErrors.password && (
                                    <p className="text-xs text-red-500 mt-1">{registerErrors.password.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        {...registerSignup('phone')}
                                        type="tel"
                                        placeholder="+84 123 456 789"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                </div>
                                {registerErrors.phone && (
                                    <p className="text-xs text-red-500 mt-1">{registerErrors.phone.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Birthday
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        {...registerSignup('birthday')}
                                        type="date"
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                    />
                                </div>
                                {registerErrors.birthday && (
                                    <p className="text-xs text-red-500 mt-1">{registerErrors.birthday.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            {...registerSignup('gender')}
                                            type="radio"
                                            value="true"
                                            className="w-4 h-4 text-rose-500 focus:ring-rose-400"
                                        />
                                        <span className="text-sm">Male</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            {...registerSignup('gender')}
                                            type="radio"
                                            value="false"
                                            className="w-4 h-4 text-rose-500 focus:ring-rose-400"
                                        />
                                        <span className="text-sm">Female</span>
                                    </label>
                                </div>
                                {registerErrors.gender && (
                                    <p className="text-xs text-red-500 mt-1">{registerErrors.gender.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
