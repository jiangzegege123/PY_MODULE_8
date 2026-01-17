import { useNavigate } from 'react-router-dom'
import type { IMessage } from '@/types'
import { 
  CalendarDays, 
  Receipt, 
  Bell, 
  Settings, 
  Gift,
  ChevronRight,
  Clock
} from 'lucide-react'

interface MessageCardProps {
  message: IMessage
  onMarkAsRead?: (messageId: string) => void
  onClick?: (message: IMessage) => void
}

export default function MessageCard({ message, onMarkAsRead, onClick }: MessageCardProps) {
  const navigate = useNavigate()

  const getIcon = () => {
    switch (message.type) {
      case 'appointment':
        return <CalendarDays className="w-5 h-5 text-blue-600" />
      case 'billing':
        return <Receipt className="w-5 h-5 text-green-600" />
      case 'reminder':
        return <Bell className="w-5 h-5 text-orange-600" />
      case 'system':
        return <Settings className="w-5 h-5 text-gray-600" />
      case 'promotion':
        return <Gift className="w-5 h-5 text-purple-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeLabel = () => {
    switch (message.type) {
      case 'appointment':
        return 'Appointment'
      case 'billing':
        return 'Billing'
      case 'reminder':
        return 'Reminder'
      case 'system':
        return 'System'
      case 'promotion':
        return 'Promotion'
      default:
        return 'Message'
    }
  }

  const getTypeColor = () => {
    switch (message.type) {
      case 'appointment':
        return 'bg-blue-100 text-blue-700'
      case 'billing':
        return 'bg-green-100 text-green-700'
      case 'reminder':
        return 'bg-orange-100 text-orange-700'
      case 'system':
        return 'bg-gray-100 text-gray-700'
      case 'promotion':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60))
      return `${minutes}m ago`
    }
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    
    return date.toLocaleDateString('en-AU', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  const handleClick = () => {
    if (message.status === 'unread' && onMarkAsRead) {
      onMarkAsRead(message.id)
    }
    
    if (onClick) {
      onClick(message)
    } else {
      navigate(`/messages/${message.id}`)
    }
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (message.metadata?.actionUrl) {
      navigate(message.metadata.actionUrl)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
        message.status === 'unread' ? 'bg-blue-50/30' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            message.status === 'unread' ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            {getIcon()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTypeColor()}`}>
                {getTypeLabel()}
              </span>
              {message.status === 'unread' && (
                <span className="w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
              <Clock className="w-3 h-3" />
              {formatTime(message.createdAt)}
            </div>
          </div>

          <h3 className={`text-sm font-semibold mb-1 ${
            message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'
          }`}>
            {message.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {message.content}
          </p>

          {message.metadata?.actionLabel && (
            <button
              onClick={handleActionClick}
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {message.metadata.actionLabel}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
