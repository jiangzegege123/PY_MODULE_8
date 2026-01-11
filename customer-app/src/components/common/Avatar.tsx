import { cn, getInitials } from '@/utils'

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src?: string
  name?: string
  size?: AvatarSize
  className?: string
}

const sizeStyles: Record<AvatarSize, { container: string; text: string }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-12 h-12', text: 'text-sm' },
  lg: { container: 'w-16 h-16', text: 'text-lg' },
  xl: { container: 'w-24 h-24', text: 'text-2xl' },
}

export function Avatar({ src, name = '', size = 'md', className }: AvatarProps) {
  const sizeStyle = sizeStyles[size]
  const initials = getInitials(name)

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover', sizeStyle.container, className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-primary-100 flex items-center justify-center',
        sizeStyle.container,
        className
      )}
    >
      <span className={cn('font-semibold text-primary-600', sizeStyle.text)}>
        {initials}
      </span>
    </div>
  )
}
