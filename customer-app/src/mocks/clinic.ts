export interface IClinicInfo {
  name: string
  address: string
  phone: string
  email: string
  openingHours: IOpeningHours[]
  emergencyContacts: IEmergencyContact[]
}

export interface IOpeningHours {
  day: string
  open: string
  close: string
  isClosed: boolean
}

export interface IEmergencyContact {
  name: string
  number: string
  description: string
}

export const mockClinicInfo: IClinicInfo = {
  name: 'HealthFirst Medical Centre',
  address: '123 Medical Street, Sydney NSW 2000',
  phone: '(02) 9123 4567',
  email: 'info@healthfirst.com.au',
  openingHours: [
    { day: 'Monday', open: '08:00', close: '18:00', isClosed: false },
    { day: 'Tuesday', open: '08:00', close: '18:00', isClosed: false },
    { day: 'Wednesday', open: '08:00', close: '18:00', isClosed: false },
    { day: 'Thursday', open: '08:00', close: '20:00', isClosed: false },
    { day: 'Friday', open: '08:00', close: '18:00', isClosed: false },
    { day: 'Saturday', open: '09:00', close: '13:00', isClosed: false },
    { day: 'Sunday', open: '', close: '', isClosed: true },
  ],
  emergencyContacts: [
    { name: 'Emergency Services', number: '000', description: 'Police, Fire, Ambulance' },
    { name: 'Healthdirect', number: '1800 022 222', description: '24/7 health advice' },
    { name: 'Lifeline', number: '13 11 14', description: '24/7 crisis support' },
    { name: 'Beyond Blue', number: '1300 22 4636', description: 'Mental health support' },
  ],
}
