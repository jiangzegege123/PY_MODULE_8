import { useNavigate } from 'react-router-dom'
import { ChevronRight, Users } from 'lucide-react'
import { Header, Card, Avatar, Button } from '@/components/common'
import { useBookingStore } from '@/store'
import { mockDoctors } from '@/mocks'

export default function SelectDoctor() {
  const navigate = useNavigate()
  const { setDoctorId, serviceType } = useBookingStore()

  // Filter doctors based on service type
  const filteredDoctors = mockDoctors.filter((doctor) => {
    if (serviceType === 'GP Consultation') {
      return doctor.title === 'General Practitioner'
    } else if (serviceType === 'Skin Specialist') {
      return doctor.title === 'Skin Specialist'
    }
    return true
  })

  const handleSelect = (doctorId: string | null) => {
    setDoctorId(doctorId)
    navigate('/booking/time')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Select Doctor" />

      <div className="px-6 py-6">
        <p className="text-gray-500 mb-6">
          Choose a doctor for your <span className="font-medium text-gray-700">{serviceType}</span>
        </p>

        {/* Any Available Option */}
        <Card onClick={() => handleSelect(null)} className="mb-4 border-2 border-primary-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Users size={24} className="text-primary-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Any Available Doctor</p>
              <p className="text-sm text-gray-500">Book the next available slot</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </Card>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">or select a doctor</span>
          </div>
        </div>

        <div className="space-y-3">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} onClick={() => handleSelect(doctor.id)}>
              <div className="flex items-center gap-4">
                <Avatar src={doctor.photoUrl} name={doctor.name} size="lg" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{doctor.name}</p>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doctor.languages.slice(0, 2).map((lang) => (
                      <span key={lang} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                        {lang}
                      </span>
                    ))}
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
