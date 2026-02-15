import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { signUp } from '../lib/auth-client'
import SignUpForm from '../features/auth/SignUpForm'

export const Route = createFileRoute('/signup')({
  component: SignUp,
})

function SignUp() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignUp = async (nextName: string, nextEmail: string, nextPassword: string) => {
    const { error } = await signUp.email({
      email: nextEmail,
      password: nextPassword,
      name: nextName,
      callbackURL: '/',
    })
    if (error) {
      setError(error.message || 'Une erreur est survenue')
      return
    }
    setError('')
    await navigate({ to: '/signin', search: { signup: 'success' } })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <SignUpForm handleSignUp={handleSignUp} error={error} />
        <p className="mt-4 text-sm text-center">
          Déjà un compte ?{' '}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
