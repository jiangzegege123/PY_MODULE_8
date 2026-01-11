import { format, parseISO, isToday, isTomorrow, addDays } from 'date-fns'

// Date formatting
export const formatDate = (date: string | Date, formatStr = 'dd MMM yyyy'): string => {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, formatStr)
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export const getRelativeDay = (date: string): string => {
  const d = parseISO(date)
  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  return formatDate(date, 'EEEE, dd MMM')
}

export const getBookableDates = (daysAhead: number): Date[] => {
  const dates: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i <= daysAhead; i++) {
    const date = addDays(today, i)
    if (date.getDay() !== 0) { // Skip Sundays
      dates.push(date)
    }
  }
  return dates
}

// Text formatting
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }
  return phone
}

export const maskMedicareNumber = (medicare: string): string => {
  if (!medicare || medicare.length < 4) return medicare
  const lastFour = medicare.slice(-4)
  return `XXXXXX${lastFour}`
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount)
}

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Classname utility
export const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ')
}
