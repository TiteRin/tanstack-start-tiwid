import {createFileRoute, redirect} from '@tanstack/react-router'
import {getSession} from "@/server/getSession.ts";
import HomePage from "@/features/home/ui/HomePage.tsx";
import {getHomePageDataServer} from "@/features/home/server/getHomePageData.functions.ts";
import {HomeStoreProvider} from "@/features/home/state/home-store-provider.tsx";

export const Route = createFileRoute('/app')({
    loader: async () => {
        // charger la session
        const session = await getSession();

        if (!session || !session.user) {
            throw redirect({to: "/"});
        }

        const homePageData = await getHomePageDataServer();

        return {session, homePageData}
    },
    component: RouteComponent,
})

function RouteComponent() {

    const {session, homePageData} = Route.useLoaderData();

    return (
        <HomeStoreProvider initialData={{
            praise: "",
            countTotalTasks: homePageData.countTotalTasks,
            countDoneTasksToday: homePageData.countDoneTasksToday
        }}>
            <HomePage user={session.user}/>
        </HomeStoreProvider>
    );
}
