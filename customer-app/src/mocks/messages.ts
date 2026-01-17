import type { IMessage } from '@/types'

// Mock messages data including appointment reminders, billing updates, and other notifications
export const mockMessages: IMessage[] = [
  {
    id: 'msg-001',
    userId: '1',
    type: 'reminder',
    title: 'Upcoming Appointment Reminder',
    content: 'Your appointment with Dr. Sarah Chen is tomorrow at 10:00 AM. Please arrive 10 minutes early.',
    status: 'unread',
    createdAt: '2026-01-16T14:30:00Z',
    metadata: {
      appointmentId: 'apt-001',
      appointmentDate: '2026-01-18',
      appointmentTime: '10:00 AM',
      doctorName: 'Dr. Sarah Chen',
      actionUrl: '/appointment/apt-001',
      actionLabel: 'View Details'
    }
  },
  {
    id: 'msg-002',
    userId: '1',
    type: 'billing',
    title: 'Bulk Bill Processed',
    content: 'Your Medicare bulk bill claim for appointment on Jan 15 has been processed. No payment required from you.',
    status: 'unread',
    createdAt: '2026-01-16T10:00:00Z',
    metadata: {
      invoiceId: 'inv-001',
      invoiceAmount: 0,
      appointmentDate: '2026-01-15',
      actionUrl: '/invoices',
      actionLabel: 'View Invoice'
    }
  },
  {
    id: 'msg-003',
    userId: '1',
    type: 'billing',
    title: 'Payment Received',
    content: 'We have received your payment of $85.50 for invoice #INV-2024-0234. Thank you!',
    status: 'unread',
    createdAt: '2026-01-15T16:45:00Z',
    metadata: {
      invoiceId: 'inv-002',
      invoiceAmount: 85.50,
      actionUrl: '/invoices',
      actionLabel: 'View Invoice'
    }
  },
  {
    id: 'msg-004',
    userId: '1',
    type: 'appointment',
    title: 'Appointment Confirmed',
    content: 'Your appointment with Dr. Michael Zhang has been confirmed for Jan 25, 2026 at 2:30 PM.',
    status: 'read',
    createdAt: '2026-01-14T09:20:00Z',
    readAt: '2026-01-14T11:30:00Z',
    metadata: {
      appointmentId: 'apt-003',
      appointmentDate: '2026-01-25',
      appointmentTime: '2:30 PM',
      doctorName: 'Dr. Michael Zhang',
      actionUrl: '/appointment/apt-003',
      actionLabel: 'View Appointment'
    }
  },
  {
    id: 'msg-005',
    userId: '1',
    type: 'reminder',
    title: 'Appointment in 24 Hours',
    content: 'Reminder: You have an appointment with Dr. Sarah Chen in 24 hours (Jan 18 at 10:00 AM).',
    status: 'read',
    createdAt: '2026-01-17T10:00:00Z',
    readAt: '2026-01-17T10:15:00Z',
    metadata: {
      appointmentId: 'apt-001',
      appointmentDate: '2026-01-18',
      appointmentTime: '10:00 AM',
      doctorName: 'Dr. Sarah Chen',
      actionUrl: '/appointment/apt-001',
      actionLabel: 'View Details'
    }
  },
  {
    id: 'msg-006',
    userId: '1',
    type: 'billing',
    title: 'Invoice Available',
    content: 'Your invoice for the consultation on Jan 12 is now available. Total amount: $125.00 (Medicare rebate: $39.50).',
    status: 'read',
    createdAt: '2026-01-13T14:00:00Z',
    readAt: '2026-01-13T15:22:00Z',
    metadata: {
      invoiceId: 'inv-003',
      invoiceAmount: 125.00,
      actionUrl: '/invoices',
      actionLabel: 'Pay Now'
    }
  },
  {
    id: 'msg-007',
    userId: '1',
    type: 'system',
    title: 'Profile Updated Successfully',
    content: 'Your profile information has been updated successfully. Your changes are now saved.',
    status: 'read',
    createdAt: '2026-01-12T11:30:00Z',
    readAt: '2026-01-12T11:31:00Z'
  },
  {
    id: 'msg-008',
    userId: '1',
    type: 'reminder',
    title: 'Don\'t Forget Your Appointment',
    content: 'Your appointment with Dr. Emily Watson is in 2 hours (Today at 3:00 PM). See you soon!',
    status: 'read',
    createdAt: '2026-01-10T13:00:00Z',
    readAt: '2026-01-10T13:05:00Z',
    metadata: {
      appointmentId: 'apt-004',
      appointmentDate: '2026-01-10',
      appointmentTime: '3:00 PM',
      doctorName: 'Dr. Emily Watson',
      actionUrl: '/appointment/apt-004',
      actionLabel: 'View Details'
    }
  },
  {
    id: 'msg-009',
    userId: '1',
    type: 'promotion',
    title: 'Health Check Reminder',
    content: 'It\'s been 6 months since your last health check. Book your annual health assessment today!',
    status: 'read',
    createdAt: '2026-01-08T09:00:00Z',
    readAt: '2026-01-08T14:20:00Z',
    metadata: {
      actionUrl: '/booking/service',
      actionLabel: 'Book Now'
    }
  },
  {
    id: 'msg-010',
    userId: '1',
    type: 'billing',
    title: 'Medicare Rebate Processed',
    content: 'Good news! Your Medicare rebate of $39.50 has been processed and will be deposited to your nominated bank account within 3-5 business days.',
    status: 'read',
    createdAt: '2026-01-05T10:30:00Z',
    readAt: '2026-01-05T16:45:00Z',
    metadata: {
      invoiceId: 'inv-004',
      invoiceAmount: 39.50,
      actionUrl: '/invoices',
      actionLabel: 'View Details'
    }
  }
]
