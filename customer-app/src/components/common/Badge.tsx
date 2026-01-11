import { cn } from '@/utils'
import type { AppointmentStatus } from '@/types'

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default'

interface BadgeProps {
  text: string
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-50 text-green-600',
  warning: 'bg-amber-50 text-amber-600',
  error: 'bg-red-50 text-red-600',
  info: 'bg-primary-50 text-primary-600',
  default: 'bg-gray-100 text-gray-600',
}

export function Badge({ text, variant = 'default' }: BadgeProps) {
  return (
    <span className={cn('px-3 py-1 rounded-full text-xs font-semibold', variantStyles[variant])}>
      {text}
    </span>
  )
}

export function getStatusBadgeVariant(status: AppointmentStatus): BadgeVariant {
  switch (status) {
    case 'Confirmed':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Completed':
      return 'info'
    case 'Cancelled':
    case 'NoShow':
      return 'error'
    default:
      return 'default'
  }
}
