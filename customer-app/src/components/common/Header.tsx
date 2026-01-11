import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

interface HeaderProps {
  title: string
  showBack?: boolean
  rightAction?: React.ReactNode
}

export function Header({ title, showBack = true, rightAction }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-br from-primary-500 to-primary-600 px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="w-12">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
          )}
        </div>
        <h1 className="text-xl font-bold text-white flex-1 text-center">
          {title}
        </h1>
        <div className="w-12 flex justify-end">
          {rightAction}
        </div>
      </div>
    </header>
  )
}
