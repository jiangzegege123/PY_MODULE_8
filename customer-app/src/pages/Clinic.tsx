import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ChevronRight, AlertCircle, ChevronDown } from 'lucide-react'
import { Card, Avatar } from '@/components/common'
import { mockClinicInfo, mockDoctors } from '@/mocks'

export default function Clinic() {
  const navigate = useNavigate()
  const clinic = mockClinicInfo
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todayHours = clinic.openingHours.find((h) => h.day === today)
  const [showAllDoctors, setShowAllDoctors] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 px-6 pt-12 pb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{clinic.name}</h1>
        <div className="flex items-center gap-2 text-primary-100">
          <MapPin size={16} />
          <p className="text-sm">{clinic.address}</p>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        {/* Contact Info */}
        <Card className="shadow-lg">
          <h2 className="font-semibold text-gray-800 mb-4">Contact</h2>
          <div className="space-y-3">
            <a href={`tel:${clinic.phone}`} className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Phone size={18} className="text-primary-500" />
              </div>
              <span>{clinic.phone}</span>
            </a>
            <a href={`mailto:${clinic.email}`} className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Mail size={18} className="text-primary-500" />
              </div>
              <span>{clinic.email}</span>
            </a>
          </div>
        </Card>

        {/* Opening Hours */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Opening Hours</h2>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-gray-400" />
              <span className="text-gray-500">
                {todayHours?.isClosed
                  ? 'Closed today'
                  : `Today: ${todayHours?.open} - ${todayHours?.close}`}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {clinic.openingHours.map((hours) => (
              <div
                key={hours.day}
                className={`flex justify-between py-2 ${
                  hours.day === today ? 'font-medium text-primary-600' : 'text-gray-600'
                }`}
              >
                <span>{hours.day}</span>
                <span>
                  {hours.isClosed ? 'Closed' : `${hours.open} - ${hours.close}`}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Our Doctors */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Our Doctors</h2>
            <span className="text-sm text-gray-500">{mockDoctors.length} doctors</span>
          </div>
          <div className="space-y-3">
            {(showAllDoctors ? mockDoctors : mockDoctors.slice(0, 3)).map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => navigate(`/doctor/${doctor.id}`)}
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Avatar src={doctor.photoUrl} name={doctor.name} size="md" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-800">{doctor.name}</p>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            ))}
          </div>
          {mockDoctors.length > 3 && (
            <button
              onClick={() => setShowAllDoctors(!showAllDoctors)}
              className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors"
            >
              {showAllDoctors ? 'Show Less' : `View All (${mockDoctors.length - 3} more)`}
              <ChevronDown size={18} className={`transition-transform ${showAllDoctors ? 'rotate-180' : ''}`} />
            </button>
          )}
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-red-500" />
            <h2 className="font-semibold text-gray-800">Emergency Contacts</h2>
          </div>
          <div className="space-y-3">
            {clinic.emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="flex items-center justify-between p-3 bg-red-50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-800">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.description}</p>
                </div>
                <span className="font-semibold text-red-600">{contact.number}</span>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
