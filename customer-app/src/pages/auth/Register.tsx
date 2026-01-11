import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Header } from '@/components/common'
import { useAuthStore } from '@/store'
import type { Gender } from '@/types'

export default function Register() {
  const navigate = useNavigate()
  const { register, isLoading, error } = useAuthStore()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '' as Gender | '',
    dateOfBirth: '',
  })
  const [formError, setFormError] = useState('')

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setFormError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match')
      return
    }

    if (!formData.gender) {
      setFormError('Please select your gender')
      return
    }

    const success = await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      gender: formData.gender as Gender,
      dateOfBirth: formData.dateOfBirth,
    })

    if (success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Create Account" />

      <div className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Get started</h2>
          <p className="text-gray-500">Create your account to book appointments</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="0412 345 678"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-3">
              {(['Male', 'Female', 'Other'] as const).map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => updateField('gender', gender)}
                  className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${
                    formData.gender === gender
                      ? 'border-primary-500 bg-primary-50 text-primary-600'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateField('dateOfBirth', e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Min 8 characters"
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            error={formError || error || undefined}
            required
          />

          <div className="pt-4">
            <Button type="submit" loading={isLoading}>
              Create Account
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary-500 font-semibold"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
