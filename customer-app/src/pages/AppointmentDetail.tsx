import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, MapPin, Phone, X } from 'lucide-react'
import { Header, Card, Avatar, Badge, getStatusBadgeVariant, Button } from '@/components/common'
import { useAuthStore } from '@/store'
import { generateMockAppointments, getDoctorById, mockClinicInfo } from '@/mocks'
import { formatDate, formatTime, getRelativeDay } from '@/utils'

export default function AppointmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const appointments = user ? generateMockAppointments(user.id) : []
  const appointment = appointments.find((a) => a.id === id)
  const doctor = appointment ? getDoctorById(appointment.doctorId) : null

  if (!appointment) {
    return (
      <div className="min-h-screen bg-white">
        <Header title="Appointment" />
        <div className="p-6 text-center text-gray-500">Appointment not found</div>
      </div>
    )
  }

  const canCancel = appointment.status === 'Confirmed' || appointment.status === 'Pending'

  const handleCancel = () => {
    // In a real app, this would call an API
    alert('Appointment cancelled (demo)')
    navigate('/appointments')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Appointment Details" />

      <div className="px-6 py-6 space-y-4">
        {/* Status Banner */}
        <div className="flex items-center justify-center">
          <Badge
            text={appointment.status}
            variant={getStatusBadgeVariant(appointment.status)}
          />
        </div>

        {/* Doctor Info */}
        <Card>
          <div className="flex items-center gap-4">
            <Avatar src={doctor?.photoUrl} name={doctor?.name} size="lg" />
            <div>
              <p className="font-semibold text-gray-800">{doctor?.name}</p>
              <p className="text-sm text-gray-500">{doctor?.specialty}</p>
              <button
                onClick={() => navigate(`/doctor/${doctor?.id}`)}
                className="text-sm text-primary-500 font-medium mt-1"
              >
                View Profile
              </button>
            </div>
          </div>
        </Card>

        {/* Appointment Info */}
        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Appointment Info</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Calendar size={18} className="text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium text-gray-800">
                  {getRelativeDay(appointment.appointmentDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Clock size={18} className="text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium text-gray-800">
                  {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <span className="text-lg">🩺</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium text-gray-800">{appointment.serviceType}</p>
              </div>
            </div>

            {appointment.reason && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500">Reason for visit</p>
                <p className="text-gray-800">{appointment.reason}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Location */}
        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Location</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-800">{mockClinicInfo.name}</p>
                <p className="text-sm text-gray-500">{mockClinicInfo.address}</p>
              </div>
            </div>
            <a
              href={`tel:${mockClinicInfo.phone}`}
              className="flex items-center gap-3 text-primary-500"
            >
              <Phone size={20} />
              <span>{mockClinicInfo.phone}</span>
            </a>
          </div>
        </Card>

        {/* Actions */}
        {canCancel && (
          <div className="pt-4 space-y-3">
            <Button variant="outline" onClick={() => navigate('/booking/time')}>
              Reschedule
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              <X size={20} />
              Cancel Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
