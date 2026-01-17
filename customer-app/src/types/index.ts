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
export type AppointmentStatus = 'Confirmed' | 'Completed' | 'Cancelled' | 'NoShow'

export type ServiceType =
  | 'GP Consultation'
  | 'Skin Specialist'

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
  doctorId: string        // 医生ID（外键）
  date: string            // 日期 (YYYY-MM-DD)
  startTime: string       // 开始时间 (HH:mm)
  endTime: string         // 结束时间 (HH:mm)
  isAvailable: boolean    // 是否可用
  appointmentId?: string  // 预约ID（如果已被预约）
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

// Message Types
export type MessageType = 'appointment' | 'billing' | 'reminder' | 'system' | 'promotion'
export type MessageStatus = 'unread' | 'read' | 'archived'

export interface IMessage {
  id: string
  userId: string
  type: MessageType
  title: string
  content: string
  status: MessageStatus
  createdAt: string
  readAt?: string
  relatedId?: string // 关联的预约ID或发票ID等
  metadata?: {
    appointmentId?: string
    appointmentDate?: string
    appointmentTime?: string
    doctorName?: string
    invoiceId?: string
    invoiceAmount?: number
    actionUrl?: string
    actionLabel?: string
  }
}
