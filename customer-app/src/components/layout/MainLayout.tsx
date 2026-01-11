import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, Calendar, Building2, User } from 'lucide-react'
import { cn } from '@/utils'

const tabs = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/appointments', icon: Calendar, label: 'Appointments' },
  { path: '/clinic', icon: Building2, label: 'Clinic' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 max-w-[430px] mx-auto">
        <div className="flex justify-around items-center h-16 px-2">
          {tabs.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 py-2 transition-colors',
                  isActive ? 'text-primary-500' : 'text-gray-400'
                )}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn('text-xs mt-1', isActive && 'font-medium')}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
