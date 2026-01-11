import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { Button, Input, Header } from '@/components/common'
import { useAuthStore } from '@/store'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(identifier, password)
    if (success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title="Log In" />

      <div className="px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
          <p className="text-gray-500">Enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Phone or Email"
            placeholder="Enter your phone or email"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value)
              clearError()
            }}
            icon={identifier.includes('@') ? <Mail size={20} /> : <Phone size={20} />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              clearError()
            }}
            error={error || undefined}
          />

          <div className="text-right">
            <button type="button" className="text-sm text-primary-500 font-medium">
              Forgot Password?
            </button>
          </div>

          <div className="pt-4">
            <Button type="submit" loading={isLoading}>
              Log In
            </Button>
          </div>
        </form>

        {/* Demo hint */}
        <div className="mt-6 p-4 bg-primary-50 rounded-xl">
          <p className="text-sm text-primary-700 text-center">
            <strong>Demo:</strong> Use any phone/email with password <strong>123456</strong>
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-primary-500 font-semibold"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
