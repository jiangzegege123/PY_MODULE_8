import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, User } from 'lucide-react'
import { Header, Card, Avatar, Button, Input } from '@/components/common'
import { useBookingStore } from '@/store'
import { getDoctorById } from '@/mocks'
import { formatDate, formatTime, cn } from '@/utils'

export default function ConfirmBooking() {
  const navigate = useNavigate()
  const {
    serviceType,
    doctorId,
    selectedDate,
    selectedTimeSlot,
    reason,
    isFirstVisit,
    setReason,
    setIsFirstVisit,
    reset,
  } = useBookingStore()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const doctor = doctorId ? getDoctorById(doctorId) : null

  const handleConfirm = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    reset()
    navigate('/booking/success')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header title="Confirm Booking" />

      <div className="flex-1 px-6 py-6 space-y-4">
        {/* Appointment Summary */}
        <Card variant="outlined">
          <h3 className="font-semibold text-gray-800 mb-4">Appointment Details</h3>

          <div className="space-y-4">
            {/* Service */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <span className="text-lg">🩺</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium text-gray-800">{serviceType}</p>
              </div>
            </div>

            {/* Doctor */}
            <div className="flex items-center gap-3">
              {doctor ? (
                <>
                  <Avatar src={doctor.photoUrl} name={doctor.name} size="md" />
                  <div>
                    <p className="text-sm text-gray-500">Doctor</p>
                    <p className="font-medium text-gray-800">{doctor.name}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Doctor</p>
                    <p className="font-medium text-gray-800">Any Available</p>
                  </div>
                </>
              )}
            </div>

            {/* Date & Time */}
            <div className="flex gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-800">
                    {selectedDate ? formatDate(selectedDate, 'EEE, dd MMM') : '-'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Clock size={18} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-800">
                    {selectedTimeSlot ? formatTime(selectedTimeSlot.startTime) : '-'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Additional Information</h3>

          <Input
            label="Reason for visit (optional)"
            placeholder="e.g., Annual checkup, cough, etc."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Is this your first visit?</p>
            <div className="flex gap-3">
              {[true, false].map((value) => (
                <button
                  key={String(value)}
                  onClick={() => setIsFirstVisit(value)}
                  className={cn(
                    'flex-1 py-3 rounded-xl font-medium transition-colors',
                    isFirstVisit === value
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {value ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Cancellation Policy */}
        <div className="p-4 bg-amber-50 rounded-xl">
          <p className="text-sm text-amber-700">
            <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before your appointment.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100">
        <Button onClick={handleConfirm} loading={isSubmitting}>
          Confirm Booking
        </Button>
      </div>
    </div>
  )
}
