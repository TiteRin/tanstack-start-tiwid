import {HomeStoreProvider} from "@/features/home/state/home-store-provider.tsx";
import {createHomeStore} from "@/features/home/state/home.store.ts";

export function TestHomeStoreProvider(
    {
        children,
        initialData = {
            praise: "",
            countTotalTasks: 0,
            countDoneTasksToday: 0
        },
        store
    }: {
        children: React.ReactNode,
        initialData?: {
            praise: string,
            countTotalTasks: number,
            countDoneTasksToday: number
        },
        store?: ReturnType<typeof createHomeStore>
    }) {
    return <HomeStoreProvider initialData={initialData} store={store}>
        {children}
    </HomeStoreProvider>

}