import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/common'
import { Stethoscope } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-500 to-primary-600">
      {/* Logo & Branding */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-white">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-lg">
          <Stethoscope size={48} className="text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">ClinicApp</h1>
        <p className="text-primary-100 text-center">
          Book appointments, manage your health
        </p>
      </div>

      {/* Features */}
      <div className="px-8 py-6 text-white">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">📅</span>
            </div>
            <p className="text-sm">Easy online appointment booking</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">🔔</span>
            </div>
            <p className="text-sm">Smart reminders - never miss an appointment</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg">💳</span>
            </div>
            <p className="text-sm">Medicare bulk billing support</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-8 pb-12 space-y-3">
        <Button onClick={() => navigate('/login')} variant="secondary">
          Log In
        </Button>
        <Button onClick={() => navigate('/register')} variant="outline" className="border-white text-white hover:bg-white/10">
          Create Account
        </Button>
      </div>
    </div>
  )
}
