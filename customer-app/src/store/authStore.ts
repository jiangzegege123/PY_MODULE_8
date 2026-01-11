import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IUser, Gender } from '@/types'

interface AuthState {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (identifier: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  updateUser: (data: Partial<IUser>) => void
  clearError: () => void
}

interface RegisterData {
  phone: string
  email: string
  password: string
  fullName: string
  gender: Gender
  dateOfBirth: string
}

const MOCK_PASSWORD = '123456'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (identifier, password) => {
        set({ isLoading: true, error: null })

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (password !== MOCK_PASSWORD) {
          set({ isLoading: false, error: 'Invalid password. Try: 123456' })
          return false
        }

        const mockUser: IUser = {
          id: '1',
          phone: identifier.includes('@') ? '0412345678' : identifier,
          email: identifier.includes('@') ? identifier : 'user@example.com',
          fullName: 'John Smith',
          gender: 'Male',
          dateOfBirth: '1985-03-15',
          medicareNumber: '2123456789',
          medicareIrn: 1,
          medicareExpiry: '2026-12',
          notificationPreferences: {
            push: true,
            sms: true,
            email: true,
            marketingEnabled: false,
            reminderHoursBefore: [24, 2],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set({ user: mockUser, isAuthenticated: true, isLoading: false })
        return true
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        await new Promise((resolve) => setTimeout(resolve, 800))

        const newUser: IUser = {
          id: Date.now().toString(),
          phone: data.phone,
          email: data.email,
          fullName: data.fullName,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          notificationPreferences: {
            push: true,
            sms: true,
            email: true,
            marketingEnabled: false,
            reminderHoursBefore: [24, 2],
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set({ user: newUser, isAuthenticated: true, isLoading: false })
        return true
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null })
      },

      updateUser: (data) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...data, updatedAt: new Date().toISOString() } })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
