import type { IAppointment, ITimeSlot, ServiceType } from '@/types'
import { addDays, format } from 'date-fns'

export const generateMockAppointments = (userId: string): IAppointment[] => {
  const today = new Date()

  return [
    {
      id: '1',
      userId,
      doctorId: '1',
      serviceType: 'GP Consultation',
      appointmentDate: format(addDays(today, 2), 'yyyy-MM-dd'),
      startTime: '10:00',
      endTime: '10:15',
      status: 'Confirmed',
      reason: 'Annual health check',
      isFirstVisit: false,
      createdAt: format(addDays(today, -5), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(addDays(today, -5), "yyyy-MM-dd'T'HH:mm:ss"),
    },
    {
      id: '2',
      userId,
      doctorId: '3',
      serviceType: 'Mental Health',
      appointmentDate: format(addDays(today, 7), 'yyyy-MM-dd'),
      startTime: '14:30',
      endTime: '15:00',
      status: 'Pending',
      reason: 'Follow-up consultation',
      isFirstVisit: false,
      createdAt: format(addDays(today, -2), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(addDays(today, -2), "yyyy-MM-dd'T'HH:mm:ss"),
    },
    {
      id: '3',
      userId,
      doctorId: '2',
      serviceType: 'GP Consultation',
      appointmentDate: format(addDays(today, -14), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '09:15',
      status: 'Completed',
      reason: 'Knee pain',
      isFirstVisit: false,
      createdAt: format(addDays(today, -20), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(addDays(today, -14), "yyyy-MM-dd'T'HH:mm:ss"),
    },
    {
      id: '4',
      userId,
      doctorId: '1',
      serviceType: 'Health Check',
      appointmentDate: format(addDays(today, -30), 'yyyy-MM-dd'),
      startTime: '11:00',
      endTime: '11:30',
      status: 'Completed',
      isFirstVisit: false,
      createdAt: format(addDays(today, -35), "yyyy-MM-dd'T'HH:mm:ss"),
      updatedAt: format(addDays(today, -30), "yyyy-MM-dd'T'HH:mm:ss"),
    },
  ]
}

export const generateTimeSlots = (_date: string, _doctorId: string): ITimeSlot[] => {
  const slots: ITimeSlot[] = []
  const startHour = 9
  const endHour = 17
  const slotDuration = 15

  const unavailableSlots = new Set<string>()
  const numUnavailable = Math.floor(Math.random() * 10) + 5

  for (let i = 0; i < numUnavailable; i++) {
    const randomHour = startHour + Math.floor(Math.random() * (endHour - startHour))
    const randomMinute = Math.floor(Math.random() * 4) * slotDuration
    unavailableSlots.add(`${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`)
  }

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      if (hour === 12) continue // Skip lunch

      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const endMinute = minute + slotDuration
      const endHourAdjusted = endMinute >= 60 ? hour + 1 : hour
      const endMinuteAdjusted = endMinute >= 60 ? endMinute - 60 : endMinute
      const endTime = `${endHourAdjusted.toString().padStart(2, '0')}:${endMinuteAdjusted.toString().padStart(2, '0')}`

      slots.push({
        id: `${_date}-${startTime}`,
        startTime,
        endTime,
        isAvailable: !unavailableSlots.has(startTime),
      })
    }
  }

  return slots
}

export const SERVICE_TYPES: { type: ServiceType; description: string; duration: number; icon: string }[] = [
  { type: 'GP Consultation', description: 'General practitioner consultation', duration: 15, icon: 'stethoscope' },
  { type: 'Skin Specialist', description: 'Skin specialist consultation (available weekly)', duration: 30, icon: 'scan' },
]
