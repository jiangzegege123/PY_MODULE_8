import { create } from 'zustand'
import type { ServiceType, ITimeSlot } from '@/types'

interface BookingState {
  serviceType: ServiceType | null
  doctorId: string | null
  selectedDate: string | null
  selectedTimeSlot: ITimeSlot | null
  reason: string
  isFirstVisit: boolean
  setServiceType: (type: ServiceType) => void
  setDoctorId: (id: string | null) => void
  setSelectedDate: (date: string) => void
  setSelectedTimeSlot: (slot: ITimeSlot) => void
  setReason: (reason: string) => void
  setIsFirstVisit: (isFirst: boolean) => void
  reset: () => void
}

const initialState = {
  serviceType: null,
  doctorId: null,
  selectedDate: null,
  selectedTimeSlot: null,
  reason: '',
  isFirstVisit: false,
}

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setServiceType: (type) => set({ serviceType: type }),
  setDoctorId: (id) => set({ doctorId: id }),
  setSelectedDate: (date) => set({ selectedDate: date, selectedTimeSlot: null }),
  setSelectedTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
  setReason: (reason) => set({ reason }),
  setIsFirstVisit: (isFirst) => set({ isFirstVisit: isFirst }),
  reset: () => set(initialState),
}))
