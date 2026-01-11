import { useState } from 'react'
import { Header, Card, Button } from '@/components/common'
import { useAuthStore } from '@/store'
import { cn } from '@/utils'

interface ToggleProps {
  label: string
  description?: string
  enabled: boolean
  onChange: (enabled: boolean) => void
}

function Toggle({ label, description, enabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={cn(
          'w-12 h-7 rounded-full transition-colors',
          enabled ? 'bg-primary-500' : 'bg-gray-200'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 bg-white rounded-full shadow transition-transform',
            enabled ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  )
}

export default function NotificationSettings() {
  const { user, updateUser } = useAuthStore()
  const [isSaving, setIsSaving] = useState(false)

  const [settings, setSettings] = useState({
    push: user?.notificationPreferences.push ?? true,
    sms: user?.notificationPreferences.sms ?? true,
    email: user?.notificationPreferences.email ?? true,
    marketingEnabled: user?.notificationPreferences.marketingEnabled ?? false,
  })

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    updateUser({
      notificationPreferences: {
        ...user!.notificationPreferences,
        ...settings,
      },
    })
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Notifications" />

      <div className="px-6 py-6 space-y-4">
        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Appointment Reminders</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get reminded before your appointments
          </p>

          <div className="divide-y divide-gray-100">
            <Toggle
              label="Push Notifications"
              description="Receive alerts on your device"
              enabled={settings.push}
              onChange={(v) => updateSetting('push', v)}
            />
            <Toggle
              label="SMS"
              description="Get text message reminders"
              enabled={settings.sms}
              onChange={(v) => updateSetting('sms', v)}
            />
            <Toggle
              label="Email"
              description="Receive email notifications"
              enabled={settings.email}
              onChange={(v) => updateSetting('email', v)}
            />
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Marketing</h3>

          <Toggle
            label="Promotional Messages"
            description="News, offers, and health tips"
            enabled={settings.marketingEnabled}
            onChange={(v) => updateSetting('marketingEnabled', v)}
          />
        </Card>

        <div className="pt-4">
          <Button onClick={handleSave} loading={isSaving}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}
