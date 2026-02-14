import {createFileRoute, Link} from '@tanstack/react-router'
import {useSession} from '../lib/auth-client'
import {getRequest} from "@tanstack/react-start/server";
import {requireUser} from "@/server/requireUser.ts";
import {PrismaHomeRepository} from "@/features/home/infrastructure/PrismaHomeRepository.ts";
import {getHomePageData} from "@/features/home/server/getHomePageData.ts";
import HomePage from "@/features/home/ui/HomePage.tsx";

export const Route = createFileRoute('/')({
    loader: async () => {
        const request = getRequest();
        const userId = await requireUser(request.headers);

        const repository = new PrismaHomeRepository();
        return await getHomePageData(userId, repository);
    },
    component: App,
})

function App() {
    const {data: session, isPending} = useSession()
    // const navigate = useNavigate()

    if (isPending) {
        return <div>Chargement...</div>
    }

    if (session) {
        const data = Route.useLoaderData();
        return (
            <HomePage {...data} praise={""}/>
        )
    }

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
