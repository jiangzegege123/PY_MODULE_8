import { useNavigate } from 'react-router-dom'
import { Plus, ChevronRight, Calendar, Clock } from 'lucide-react'
import { Button, Card, Avatar, Badge, getStatusBadgeVariant } from '@/components/common'
import { useAuthStore } from '@/store'
import { generateMockAppointments, getDoctorById } from '@/mocks'
import { formatTime, getRelativeDay } from '@/utils'

export default function Home() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const appointments = user ? generateMockAppointments(user.id) : []
  const upcomingAppointments = appointments
    .filter((a) => a.status === 'Confirmed')
    .slice(0, 2)

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 px-6 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            <img src="/simmonsIcon.png" alt="Simons Medical" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">SIMONS MEDICAL</h1>
            <p className="text-primary-100 text-sm">{user?.fullName}</p>
          </div>
        </div>

        {/* Quick Book Button */}
        <Button
          onClick={() => navigate('/booking/service')}
          variant="secondary"
          className="shadow-lg"
        >
          <Plus size={20} />
          Book Appointment
        </Button>
      </div>

      {/* Upcoming Appointments */}
      <div className="px-6 -mt-4">
        <Card className="shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming</h2>
            <button
              onClick={() => navigate('/appointments')}
              className="text-primary-500 text-sm font-medium flex items-center gap-1"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-6">
              <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No upcoming appointments</p>
              <button
                onClick={() => navigate('/booking/service')}
                className="text-primary-500 font-medium mt-2"
              >
                Book now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => {
                const doctor = getDoctorById(appointment.doctorId)
                return (
                  <button
                    key={appointment.id}
                    onClick={() => navigate(`/appointment/${appointment.id}`)}
                    className="w-full p-4 rounded-xl border-2 border-primary-200 bg-white hover:bg-primary-50/30 transition-colors text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar src={doctor?.photoUrl} name={doctor?.name} size="md" />
                        <div>
                          <p className="font-semibold text-gray-800">{doctor?.name}</p>
                          <p className="text-sm text-primary-600">{appointment.serviceType}</p>
                        </div>
                      </div>
                      <Badge
                        text={appointment.status}
                        variant={getStatusBadgeVariant(appointment.status)}
                      />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 ml-12">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{getRelativeDay(appointment.appointmentDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{formatTime(appointment.startTime)}</span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card onClick={() => navigate('/clinic')} className="text-center">
            <div className="w-12 h-12 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🏥</span>
            </div>
            <p className="font-medium text-gray-800">Clinic Info</p>
          </Card>
          <Card onClick={() => navigate('/invoices')} className="text-center">
            <div className="w-12 h-12 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">💳</span>
            </div>
            <p className="font-medium text-gray-800">Invoices</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
