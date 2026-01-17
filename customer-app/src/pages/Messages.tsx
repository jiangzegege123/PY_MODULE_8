import { useEffect, useState } from 'react'
import { useMessageStore } from '@/store/messageStore'
import { MessageList } from '@/components/messages'
import { Header, Loading } from '@/components/common'
import { 
  Filter, 
  CheckCheck,
  CalendarDays,
  Receipt,
  Bell,
  Settings,
  Gift,
  Inbox
} from 'lucide-react'
import type { MessageType } from '@/types'

const filterOptions: { value: MessageType | 'all'; label: string; icon: any }[] = [
  { value: 'all', label: 'All', icon: Inbox },
  { value: 'reminder', label: 'Reminders', icon: Bell },
  { value: 'appointment', label: 'Appointments', icon: CalendarDays },
  { value: 'billing', label: 'Billing', icon: Receipt },
  { value: 'promotion', label: 'Promotions', icon: Gift },
  { value: 'system', label: 'System', icon: Settings },
]

export default function Messages() {
  const { 
    messages, 
    isLoading, 
    unreadCount,
    fetchMessages, 
    markAsRead,
    markAllAsRead 
  } = useMessageStore()

  const [selectedFilter, setSelectedFilter] = useState<MessageType | 'all'>('all')
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const handleMarkAllAsRead = () => {
    markAllAsRead()
  }

  const filteredMessages = selectedFilter === 'all' 
    ? messages 
    : messages.filter((msg) => msg.type === selectedFilter)

  const activeUnreadCount = filteredMessages.filter((msg) => msg.status === 'unread').length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Messages"
          showBack={true}
        />
        <Loading />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        title="Messages"
        showBack={true}
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={handleMarkAllAsRead}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <CheckCheck className="w-6 h-6 text-white" />
            </button>
          ) : undefined
        }
      />

      <div className="p-4">
        {/* Filter Section */}
        <div className="mb-4">
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {filterOptions.find((f) => f.value === selectedFilter)?.label}
                </span>
                {activeUnreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                    {activeUnreadCount}
                  </span>
                )}
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  showFilterMenu ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showFilterMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {filterOptions.map((option) => {
                  const Icon = option.icon
                  const count = option.value === 'all'
                    ? messages.filter((m) => m.status === 'unread').length
                    : messages.filter((m) => m.type === option.value && m.status === 'unread').length

                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedFilter(option.value)
                        setShowFilterMenu(false)
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedFilter === option.value ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${
                          selectedFilter === option.value ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <span className={`font-medium ${
                          selectedFilter === option.value ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </span>
                      </div>
                      {count > 0 && (
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          selectedFilter === option.value 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Messages List */}
        <MessageList
          messages={filteredMessages}
          onMarkAsRead={markAsRead}
        />
      </div>
    </div>
  )
}
