import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useSession, signOut } from '../lib/auth-client'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  if (isPending) {
    return <div>Chargement...</div>
  }

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-4xl font-bold">Hello World</h1>
        <p>Bienvenue, {session.user.name} !</p>
        <button
          onClick={async () => {
            await signOut()
            navigate({ to: '/' })
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Se déconnecter
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <div className="space-x-4">
        <Link
          to="/signin"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Connexion
        </Link>
        <Link
          to="/signup"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Inscription
        </Link>
      </div>
    </div>
  )
}
