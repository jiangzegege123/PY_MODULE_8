import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IMessage, MessageType, MessageStatus } from '@/types'
import { mockMessages } from '@/mocks/messages'

interface MessageState {
  messages: IMessage[]
  isLoading: boolean
  error: string | null
  unreadCount: number
  
  // Actions
  fetchMessages: () => Promise<void>
  markAsRead: (messageId: string) => void
  markAllAsRead: () => void
  deleteMessage: (messageId: string) => void
  archiveMessage: (messageId: string) => void
  getMessagesByType: (type?: MessageType) => IMessage[]
  getUnreadMessages: () => IMessage[]
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,
      unreadCount: 0,

      fetchMessages: async () => {
        set({ isLoading: true, error: null })
        
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        try {
          // In production, this would be an API call
          const messages = mockMessages
          const unreadCount = messages.filter((m) => m.status === 'unread').length

          set({ 
            messages, 
            unreadCount,
            isLoading: false 
          })
        } catch (error) {
          set({ 
            error: 'Failed to fetch messages', 
            isLoading: false 
          })
        }
      },

      markAsRead: (messageId: string) => {
        set((state) => {
          const messages = state.messages.map((msg) =>
            msg.id === messageId
              ? { ...msg, status: 'read' as MessageStatus, readAt: new Date().toISOString() }
              : msg
          )
          const unreadCount = messages.filter((m) => m.status === 'unread').length
          return { messages, unreadCount }
        })
      },

      markAllAsRead: () => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.status === 'unread'
              ? { ...msg, status: 'read' as MessageStatus, readAt: new Date().toISOString() }
              : msg
          ),
          unreadCount: 0
        }))
      },

      deleteMessage: (messageId: string) => {
        set((state) => {
          const messages = state.messages.filter((msg) => msg.id !== messageId)
          const unreadCount = messages.filter((m) => m.status === 'unread').length
          return { messages, unreadCount }
        })
      },

      archiveMessage: (messageId: string) => {
        set((state) => {
          const messages = state.messages.map((msg) =>
            msg.id === messageId
              ? { ...msg, status: 'archived' as MessageStatus }
              : msg
          )
          const unreadCount = messages.filter((m) => m.status === 'unread').length
          return { messages, unreadCount }
        })
      },

      getMessagesByType: (type?: MessageType) => {
        const { messages } = get()
        if (!type) return messages.filter((m) => m.status !== 'archived')
        return messages.filter((m) => m.type === type && m.status !== 'archived')
      },

      getUnreadMessages: () => {
        const { messages } = get()
        return messages.filter((m) => m.status === 'unread')
      }
    }),
    {
      name: 'message-storage',
      partialize: (state) => ({
        messages: state.messages,
        unreadCount: state.unreadCount
      })
    }
  )
)
