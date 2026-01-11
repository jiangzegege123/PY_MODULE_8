import { FolderOpen, LucideIcon } from 'lucide-react'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon size={40} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
        {title}
      </h3>
      {message && (
        <p className="text-gray-500 text-center mb-6">{message}</p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} fullWidth={false}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
