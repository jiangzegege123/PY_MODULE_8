import { useNavigate } from 'react-router-dom'
import { Clock, ChevronRight } from 'lucide-react'
import { Header, Card } from '@/components/common'
import { useBookingStore } from '@/store'
import { SERVICE_TYPES } from '@/mocks'
import type { ServiceType } from '@/types'

export default function SelectService() {
  const navigate = useNavigate()
  const { setServiceType } = useBookingStore()

  const handleSelect = (type: ServiceType) => {
    setServiceType(type)
    navigate('/booking/doctor')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Select Service" />

      <div className="px-6 py-6">
        <p className="text-gray-500 mb-6">
          What type of appointment would you like to book?
        </p>

        <div className="space-y-3">
          {SERVICE_TYPES.map(({ type, description, duration }) => (
            <Card key={type} onClick={() => handleSelect(type)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">
                    {type === 'GP Consultation' && '🩺'}
                    {type === 'Skin Specialist' && '🔍'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{type}</p>
                  <p className="text-sm text-gray-500">{description}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{duration} min</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
