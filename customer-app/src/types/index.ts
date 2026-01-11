// User Types
export type Gender = 'Male' | 'Female' | 'Other'

export interface IUser {
  id: string
  phone: string
  email: string
  fullName: string
  gender: Gender
  dateOfBirth: string
  address?: string
  medicareNumber?: string
  medicareIrn?: number
  medicareExpiry?: string
  privateInsurance?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  notificationPreferences: INotificationPreferences
  createdAt: string
  updatedAt: string
}

export interface INotificationPreferences {
  push: boolean
  sms: boolean
  email: boolean
  marketingEnabled: boolean
  reminderHoursBefore: number[]
}

// Appointment Types
export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'NoShow'

export type ServiceType =
  | 'GP Consultation'
  | 'Specialist Referral'
  | 'Health Check'
  | 'Vaccination'
  | 'Mental Health'
  | "Women's Health"
  | "Men's Health"
  | 'Skin Check'

export interface IAppointment {
  id: string
  userId: string
  doctorId: string
  serviceType: ServiceType
  appointmentDate: string
  startTime: string
  endTime: string
  status: AppointmentStatus
  reason?: string
  isFirstVisit: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ITimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

// Doctor Types
export interface IDoctor {
  id: string
  name: string
  title: string
  specialty: string
  bio: string
  photoUrl: string
  languages: string[]
  qualifications: string[]
  availableDays: string[]
  isActive: boolean
}

// Invoice Types
export type InvoiceStatus = 'Pending' | 'Paid' | 'Processing'

export interface IInvoice {
  id: string
  userId: string
  appointmentId: string
  invoiceNumber: string
  totalAmount: number
  medicareRebate: number
  patientPayment: number
  status: InvoiceStatus
  createdAt: string
  paidAt?: string
  items: IInvoiceItem[]
}

export interface IInvoiceItem {
  id: string
  description: string
  itemCode: string
  amount: number
  medicareRebate: number
}
