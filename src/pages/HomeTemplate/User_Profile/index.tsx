import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { User, Mail, Phone, Calendar, Camera, Lock, Save } from 'lucide-react'
import Card from '../../../components/common/Card'
import Button from '../../../components/common/Button'

const profileSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    birthday: yup.string().required('Birthday is required'),
    gender: yup.boolean().required('Gender is required'),
})

const passwordSchema = yup.object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match').required('Confirm password is required'),
})

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')
    const [avatar, setAvatar] = useState('https://via.placeholder.com/150')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors },
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+84 123 456 789',
            birthday: '1990-01-01',
            gender: true,
        },
    })

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPassword,
    } = useForm({
        resolver: yupResolver(passwordSchema),
    })

    const onProfileSubmit = (data: any) => {
        console.log('Profile update:', data)
        // TODO: Call update profile API
        alert('Profile updated successfully!')
    }

    const onPasswordSubmit = (data: any) => {
        console.log('Password change:', data)
        // TODO: Call change password API
        alert('Password changed successfully!')
        resetPassword()
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatar(reader.result as string)
                // TODO: Upload avatar to server
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar - Avatar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 text-center sticky top-4">
                            <div className="relative inline-block mb-4">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-100"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-colors"
                                    aria-label="Change avatar"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">John Doe</h2>
                            <p className="text-sm text-gray-500 mb-4">john@example.com</p>
                            <div className="flex gap-2">
                                <Button
                                    variant={activeTab === 'profile' ? 'primary' : 'secondary'}
                                    onClick={() => setActiveTab('profile')}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Button>
                                <Button
                                    variant={activeTab === 'password' ? 'primary' : 'secondary'}
                                    onClick={() => setActiveTab('password')}
                                    className="flex-1 flex items-center justify-center gap-2"
                                >
                                    <Lock className="w-4 h-4" />
                                    <span className="hidden sm:inline">Password</span>
                                </Button>
                            </div>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {activeTab === 'profile' ? (
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <User className="w-6 h-6 text-rose-500" />
                                    Personal Information
                                </h3>
                                <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                {...registerProfile('name')}
                                                type="text"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            />
                                        </div>
                                        {profileErrors.name && (
                                            <p className="text-xs text-red-500 mt-1">{profileErrors.name.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                {...registerProfile('email')}
                                                type="email"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            />
                                        </div>
                                        {profileErrors.email && (
                                            <p className="text-xs text-red-500 mt-1">{profileErrors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                {...registerProfile('phone')}
                                                type="tel"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            />
                                        </div>
                                        {profileErrors.phone && (
                                            <p className="text-xs text-red-500 mt-1">{profileErrors.phone.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Birthday
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                {...registerProfile('birthday')}
                                                type="date"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            />
                                        </div>
                                        {profileErrors.birthday && (
                                            <p className="text-xs text-red-500 mt-1">{profileErrors.birthday.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Gender
                                        </label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    {...registerProfile('gender')}
                                                    type="radio"
                                                    value="true"
                                                    className="w-4 h-4 text-rose-500 focus:ring-rose-400"
                                                />
                                                <span className="text-sm">Male</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    {...registerProfile('gender')}
                                                    type="radio"
                                                    value="false"
                                                    className="w-4 h-4 text-rose-500 focus:ring-rose-400"
                                                />
                                                <span className="text-sm">Female</span>
                                            </label>
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full flex items-center justify-center gap-2">
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </Button>
                                </form>
                            </Card>
                        ) : (
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Lock className="w-6 h-6 text-rose-500" />
                                    Change Password
                                </h3>
                                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                {...registerPassword('currentPassword')}
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            />
                                        </div>
                                        {passwordErrors.currentPassword && (
                                            <p className="text-xs text-red-500 mt-1">{passwordErrors.currentPassword.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                {...registerPassword('newPassword')}
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            />
                                        </div>
                                        {passwordErrors.newPassword && (
                                            <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                {...registerPassword('confirmPassword')}
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                                            />
                                        </div>
                                        {passwordErrors.confirmPassword && (
                                            <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword.message}</p>
                                        )}
                                    </div>

                                    <Button type="submit" className="w-full flex items-center justify-center gap-2">
                                        <Save className="w-4 h-4" />
                                        Update Password
                                    </Button>
                                </form>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
