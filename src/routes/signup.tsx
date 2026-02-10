import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { signUp } from '../lib/auth-client'

export const Route = createFileRoute('/signup')({
  component: SignUp,
})

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await signUp.email({
      email,
      password,
      name,
      callbackURL: '/',
    })
    if (error) {
      setError(error.message || 'Une erreur est survenue')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6">Inscription</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            S'inscrire
          </button>
        </form>
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
