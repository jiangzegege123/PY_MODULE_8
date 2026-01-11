import { Loader2 } from 'lucide-react'

interface LoadingProps {
  fullScreen?: boolean
  message?: string
}

export function Loading({ fullScreen = false, message }: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 size={40} className="animate-spin text-primary-500" />
        {message && <p className="mt-4 text-gray-500">{message}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 size={32} className="animate-spin text-primary-500" />
      {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
    </div>
  )
}
