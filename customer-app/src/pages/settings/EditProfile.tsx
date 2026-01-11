import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header, Input, Button, Card } from '@/components/common'
import { useAuthStore } from '@/store'

export default function EditProfile() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuthStore()

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    emergencyContactName: user?.emergencyContactName || '',
    emergencyContactPhone: user?.emergencyContactPhone || '',
  })

  const [isSaving, setIsSaving] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    updateUser(formData)
    setIsSaving(false)
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Edit Profile" />

      <div className="px-6 py-6 space-y-4">
        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Personal Information</h3>

          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
          />

          <Input
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />

          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Enter your address"
          />
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-800 mb-4">Emergency Contact</h3>

          <Input
            label="Contact Name"
            value={formData.emergencyContactName}
            onChange={(e) => updateField('emergencyContactName', e.target.value)}
            placeholder="Enter contact name"
          />

          <Input
            label="Contact Phone"
            type="tel"
            value={formData.emergencyContactPhone}
            onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
            placeholder="Enter contact phone"
          />
        </Card>

        <div className="pt-4">
          <Button onClick={handleSave} loading={isSaving}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
