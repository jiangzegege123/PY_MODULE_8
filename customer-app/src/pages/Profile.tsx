import { useNavigate } from 'react-router-dom'
import {
  User, Bell, Shield, FileText, CreditCard, LogOut, ChevronRight
} from 'lucide-react'
import { Card, Avatar } from '@/components/common'
import { useAuthStore } from '@/store'
import { maskMedicareNumber } from '@/utils'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/welcome')
  }

  const menuItems = [
    { icon: User, label: 'Edit Profile', path: '/settings/profile' },
    { icon: Bell, label: 'Notifications', path: '/settings/notifications' },
    { icon: CreditCard, label: 'Invoices', path: '/invoices' },
    { icon: Shield, label: 'Privacy & Security', path: '/settings/privacy' },
    { icon: FileText, label: 'Terms & Conditions', path: '/terms' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4">
          <Avatar name={user?.fullName} size="xl" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{user?.fullName}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Medicare Card */}
        {user?.medicareNumber && (
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Medicare</p>
                <p className="text-lg font-semibold">
                  {maskMedicareNumber(user.medicareNumber)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm mb-1">Expiry</p>
                <p className="font-semibold">{user.medicareExpiry}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Menu Items */}
        <Card>
          <div className="divide-y divide-gray-100">
            {menuItems.map(({ icon: Icon, label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full flex items-center gap-4 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon size={20} className="text-gray-600" />
                </div>
                <span className="flex-1 font-medium text-gray-800">{label}</span>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
        </Card>

        {/* Logout */}
        <Card>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 py-2 text-left"
          >
            <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <LogOut size={20} className="text-red-500" />
            </div>
            <span className="font-medium text-red-500">Log Out</span>
          </button>
        </Card>

        {/* App Version */}
        <p className="text-center text-sm text-gray-400 mt-8">
          ClinicApp v1.0.0
        </p>
      </div>
    </div>
  )
}
