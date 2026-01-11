import { cn } from '@/utils'

interface CardProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'default' | 'outlined' | 'elevated'
}

const variantStyles = {
  default: 'bg-white border border-gray-100',
  outlined: 'bg-white border-2 border-primary-200',
  elevated: 'bg-white shadow-md',
}

export function Card({ children, onClick, className, variant = 'default' }: CardProps) {
  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      onClick={onClick}
      className={cn(
        'rounded-2xl p-4 text-left w-full',
        variantStyles[variant],
        onClick && 'hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer',
        className
      )}
    >
      {children}
    </Component>
  )
}
