import {createFileRoute, Link, useNavigate} from '@tanstack/react-router'
import {useSession} from '../lib/auth-client'

export const Route = createFileRoute('/')({
    component: App,
})

function GuestWelcomeComponent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
            <h1 className="text-4xl font-bold">Welcome</h1>
            <div className="space-x-4">
                <Link
                    to="/signin"
                    className="bg-primary px-6 py-2 rounded hover:bg-primary-hover transition"
                >
                    Connexion
                </Link>
                <Link
                    to="/signup"
                    className=" border-amber-400 border-2 text-amber-400 hover:border-0 hover:text-primary hover:bg-primary-hover px-6 py-2 rounded transition"
                >
                    Inscription
                </Link>
            </div>
        </div>
    )
}

function App() {
    const {data: session, isPending} = useSession()
    const navigate = useNavigate()

    if (isPending) {
        return <div>Chargement...</div>
    }

    if (session) {
        return navigate({to: "/app"});
    }

    return <GuestWelcomeComponent/>
}
