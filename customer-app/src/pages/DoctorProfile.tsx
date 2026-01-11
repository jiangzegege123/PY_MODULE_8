import { useParams, useNavigate } from 'react-router-dom'
import { GraduationCap, Languages, Calendar } from 'lucide-react'
import { Header, Card, Avatar, Button } from '@/components/common'
import { getDoctorById } from '@/mocks'
import { useBookingStore } from '@/store'

export default function DoctorProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setDoctorId } = useBookingStore()

  const doctor = id ? getDoctorById(id) : null

  if (!doctor) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Doctor" />
        <div className="p-6 text-center text-gray-500">Doctor not found</div>
      </div>
    )
  }

  const handleBook = () => {
    setDoctorId(doctor.id)
    navigate('/booking/service')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Photo */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 pt-12 pb-16 px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-white mb-4"
        >
          ← Back
        </button>
        <div className="flex items-center gap-4">
          <Avatar src={doctor.photoUrl} name={doctor.name} size="xl" />
          <div className="text-white">
            <h1 className="text-xl font-bold">{doctor.name}</h1>
            <p className="text-primary-100">{doctor.title}</p>
            <p className="text-primary-200 text-sm">{doctor.specialty}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-4 pb-24">
        {/* About */}
        <Card className="shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-3">About</h3>
          <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
        </Card>

        {/* Qualifications */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={20} className="text-primary-500" />
            <h3 className="font-semibold text-gray-800">Qualifications</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.qualifications.map((qual) => (
              <span
                key={qual}
                className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
              >
                {qual}
              </span>
            ))}
          </div>
        </Card>

        {/* Languages */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Languages size={20} className="text-primary-500" />
            <h3 className="font-semibold text-gray-800">Languages</h3>
          </div>
          <p className="text-gray-600">{doctor.languages.join(', ')}</p>
        </Card>

        {/* Availability */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} className="text-primary-500" />
            <h3 className="font-semibold text-gray-800">Available Days</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {doctor.availableDays.map((day) => (
              <span
                key={day}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {day}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 max-w-[430px] mx-auto">
        <Button onClick={handleBook}>
          Book with {doctor.name.split(' ')[0]}
        </Button>
      </div>
    </div>
  )
}
