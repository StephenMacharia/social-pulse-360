
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return <>{children}</>
}
