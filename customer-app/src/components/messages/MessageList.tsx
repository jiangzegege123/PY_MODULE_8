import type { IMessage, MessageType } from '@/types'
import MessageCard from './MessageCard'
import { EmptyState } from '@/components/common'
import { Inbox } from 'lucide-react'

interface MessageListProps {
  messages: IMessage[]
  filterType?: MessageType
  onMarkAsRead?: (messageId: string) => void
  onMessageClick?: (message: IMessage) => void
}

export default function MessageList({ 
  messages, 
  filterType,
  onMarkAsRead,
  onMessageClick 
}: MessageListProps) {
  const filteredMessages = filterType
    ? messages.filter((msg) => msg.type === filterType && msg.status !== 'archived')
    : messages.filter((msg) => msg.status !== 'archived')

  const sortedMessages = [...filteredMessages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (sortedMessages.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No Messages"
        message={
          filterType
            ? `You don't have any ${filterType} messages`
            : "You're all caught up! No messages to display."
        }
      />
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {sortedMessages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onMarkAsRead={onMarkAsRead}
          onClick={onMessageClick}
        />
      ))}
    </div>
  )
}
