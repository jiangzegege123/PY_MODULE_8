import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Plus } from 'lucide-react'
import { Card, Avatar, Badge, getStatusBadgeVariant, EmptyState, Button } from '@/components/common'
import { useAuthStore } from '@/store'
import { generateMockAppointments, getDoctorById } from '@/mocks'
import { formatDate, formatTime, getRelativeDay, cn } from '@/utils'

type Tab = 'upcoming' | 'history'

export default function Appointments() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')

  const appointments = user ? generateMockAppointments(user.id) : []

  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'Confirmed' || a.status === 'Pending'
  )
  const historyAppointments = appointments.filter(
    (a) => a.status === 'Completed' || a.status === 'Cancelled' || a.status === 'NoShow'
  )

  const displayedAppointments = activeTab === 'upcoming' ? upcomingAppointments : historyAppointments

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Appointments</h1>
          <button
            onClick={() => navigate('/booking/service')}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-lg"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['upcoming', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 py-3 rounded-xl font-medium transition-colors',
                activeTab === tab
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              )}
            >
              {tab === 'upcoming' ? 'Upcoming' : 'History'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {displayedAppointments.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title={activeTab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
            message={
              activeTab === 'upcoming'
                ? 'Book your first appointment to get started'
                : 'Your completed appointments will appear here'
            }
            actionLabel={activeTab === 'upcoming' ? 'Book Now' : undefined}
            onAction={activeTab === 'upcoming' ? () => navigate('/booking/service') : undefined}
          />
        ) : (
          <div className="space-y-4">
            {displayedAppointments.map((appointment) => {
              const doctor = getDoctorById(appointment.doctorId)
              return (
                <Card
                  key={appointment.id}
                  onClick={() => navigate(`/appointment/${appointment.id}`)}
                >
                  <div className="flex items-start gap-4">
                    <Avatar src={doctor?.photoUrl} name={doctor?.name} size="lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-800">{doctor?.name}</p>
                          <p className="text-sm text-gray-500">{appointment.serviceType}</p>
                        </div>
                        <Badge
                          text={appointment.status}
                          variant={getStatusBadgeVariant(appointment.status)}
                        />
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(appointment.appointmentDate, 'dd MMM')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{formatTime(appointment.startTime)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
