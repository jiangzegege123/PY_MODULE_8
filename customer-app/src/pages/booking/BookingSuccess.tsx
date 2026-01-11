import { useNavigate } from 'react-router-dom'
import { CheckCircle, Calendar, Home } from 'lucide-react'
import { Button } from '@/components/common'

export default function BookingSuccess() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle size={48} className="text-green-500" />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
      <p className="text-gray-500 text-center mb-8">
        Your appointment has been successfully booked. You will receive a confirmation SMS shortly.
      </p>

      {/* Reminder Info */}
      <div className="w-full p-4 bg-primary-50 rounded-xl mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Calendar size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-primary-600">Reminders will be sent</p>
            <p className="text-primary-700 font-medium">24 hours & 2 hours before</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full space-y-3">
        <Button onClick={() => navigate('/appointments')}>
          <Calendar size={20} />
          View Appointments
        </Button>
        <Button variant="outline" onClick={() => navigate('/')}>
          <Home size={20} />
          Back to Home
        </Button>
      </div>
    </div>
  )
}
