import {createFileRoute, Link, redirect} from '@tanstack/react-router'
import {useSession} from '../lib/auth-client'
import {getSessionServer} from "@/server/getSession.server.ts";

export const Route = createFileRoute('/')({
    loader: async () => {
        const session = await getSessionServer();
        if (session?.user?.id) {
            throw redirect({ to: "/app"})
        }

        return null;
    },
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
    const {isPending} = useSession()

    if (isPending) {
        return <div>Chargement...</div>
    }

    return <GuestWelcomeComponent />
}
