import {HomeStoreProvider} from "@/features/home/state/home-store-provider.tsx";

export function TestHomeStoreProvider(
    {
        children,
        initialData = {
            praise: "",
            countTotalTasks: 0,
            countDoneTasksToday: 0
        }
    }: {
        children: React.ReactNode,
        initialData?: {
            praise: string,
            countTotalTasks: number,
            countDoneTasksToday: number
        }
    }) {
    return <HomeStoreProvider initialData={initialData}>
        {children}
    </HomeStoreProvider>

}