import type { IInvoice } from '@/types'
import { addDays, format } from 'date-fns'

export const generateMockInvoices = (userId: string): IInvoice[] => {
  const today = new Date()

  return [
    {
      id: '1',
      userId,
      appointmentId: '3',
      invoiceNumber: 'INV-2026-001',
      totalAmount: 85.0,
      medicareRebate: 41.4,
      patientPayment: 0,
      status: 'Paid',
      createdAt: format(addDays(today, -14), "yyyy-MM-dd'T'HH:mm:ss"),
      paidAt: format(addDays(today, -14), "yyyy-MM-dd'T'HH:mm:ss"),
      items: [
        {
          id: '1-1',
          description: 'Standard GP Consultation',
          itemCode: '23',
          amount: 85.0,
          medicareRebate: 41.4,
        },
      ],
    },
    {
      id: '2',
      userId,
      appointmentId: '4',
      invoiceNumber: 'INV-2025-089',
      totalAmount: 150.0,
      medicareRebate: 75.0,
      patientPayment: 0,
      status: 'Paid',
      createdAt: format(addDays(today, -30), "yyyy-MM-dd'T'HH:mm:ss"),
      paidAt: format(addDays(today, -30), "yyyy-MM-dd'T'HH:mm:ss"),
      items: [
        {
          id: '2-1',
          description: 'Health Assessment - 45+ years',
          itemCode: '701',
          amount: 150.0,
          medicareRebate: 75.0,
        },
      ],
    },
    {
      id: '3',
      userId,
      appointmentId: '1',
      invoiceNumber: 'INV-2026-002',
      totalAmount: 0,
      medicareRebate: 41.4,
      patientPayment: 0,
      status: 'Processing',
      createdAt: format(today, "yyyy-MM-dd'T'HH:mm:ss"),
      items: [
        {
          id: '3-1',
          description: 'Bulk Billed Consultation',
          itemCode: '23',
          amount: 0,
          medicareRebate: 41.4,
        },
      ],
    },
  ]
}
