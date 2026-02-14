import {createFileRoute, redirect, useNavigate} from '@tanstack/react-router'
import {signOut} from "@/lib/auth-client.ts";
import {getSessionServer} from "@/server/getSession.server.ts";

export const Route = createFileRoute('/app')({
  loader: async () => {
    const session = await getSessionServer();
    if (!session?.user?.id) {
      throw redirect({ to: "/"})
    }

    return session;
  },
  component: RouteComponent,
})

function RouteComponent() {

  const session = Route.useLoaderData();
  const navigate = useNavigate();

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
