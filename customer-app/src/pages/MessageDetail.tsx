import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMessageStore } from '@/store/messageStore'
import { Header, Card, Button } from '@/components/common'
import { 
  ArrowLeft, 
  CalendarDays, 
  Receipt, 
  Bell, 
  Settings, 
  Gift,
  Clock,
  ExternalLink,
  Trash2,
  Archive
} from 'lucide-react'

export default function MessageDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { messages, markAsRead, deleteMessage, archiveMessage } = useMessageStore()

  const message = messages.find((msg) => msg.id === id)

  useEffect(() => {
    if (message && message.status === 'unread') {
      markAsRead(message.id)
    }
  }, [message, markAsRead])

  if (!message) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Message"
          leftIcon={ArrowLeft}
          onLeftClick={() => navigate('/messages')}
        />
        <div className="p-4">
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-600">Message not found</p>
              <Button
                variant="outline"
                onClick={() => navigate('/messages')}
                className="mt-4"
              >
                Back to Messages
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const getIcon = () => {
    switch (message.type) {
      case 'appointment':
        return <CalendarDays className="w-6 h-6 text-blue-600" />
      case 'billing':
        return <Receipt className="w-6 h-6 text-green-600" />
      case 'reminder':
        return <Bell className="w-6 h-6 text-orange-600" />
      case 'system':
        return <Settings className="w-6 h-6 text-gray-600" />
      case 'promotion':
        return <Gift className="w-6 h-6 text-purple-600" />
      default:
        return <Bell className="w-6 h-6 text-gray-600" />
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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-AU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(message.id)
      navigate('/messages')
    }
  }

  const handleArchive = () => {
    archiveMessage(message.id)
    navigate('/messages')
  }

  const handleAction = () => {
    if (message.metadata?.actionUrl) {
      navigate(message.metadata.actionUrl)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        title="Message Details"
        leftIcon={ArrowLeft}
        onLeftClick={() => navigate('/messages')}
      />

      <div className="p-4 space-y-4">
        {/* Message Card */}
        <Card>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  {getIcon()}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getTypeColor()}`}>
                    {getTypeLabel()}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {message.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {formatDateTime(message.createdAt)}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-sm max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>

            {/* Metadata */}
            {message.metadata && (
              <div className="space-y-3 pt-6 border-t border-gray-100">
                {message.metadata.doctorName && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Doctor</span>
                    <span className="text-sm font-medium text-gray-900">
                      {message.metadata.doctorName}
                    </span>
                  </div>
                )}
                {message.metadata.appointmentDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Date</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(message.metadata.appointmentDate).toLocaleDateString('en-AU', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {message.metadata.appointmentTime && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Time</span>
                    <span className="text-sm font-medium text-gray-900">
                      {message.metadata.appointmentTime}
                    </span>
                  </div>
                )}
                {message.metadata.invoiceAmount !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${message.metadata.invoiceAmount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            {message.metadata?.actionUrl && (
              <div className="mt-6">
                <Button
                  onClick={handleAction}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {message.metadata.actionLabel || 'View Details'}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Actions */}
        <Card>
          <div className="p-4 space-y-2">
            <button
              onClick={handleArchive}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Archive className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Archive Message</span>
            </button>
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-600">Delete Message</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
