import {HomePageData} from "@/features/home/types.ts";

export interface HomeRepository {
    getUserById(userId: string): Promise<{ id: string, name: string }>;
    countTotalTasks(userId: string): Promise<number>;
    countDoneTasksToday(userId: string): Promise<number>;
}

export async function getHomePageData(userId: string, repository: HomeRepository): Promise<HomePageData> {

    const user = await repository.getUserById(userId);
    const totalTasks = await repository.countTotalTasks(userId);
    const doneTasksToday = await repository.countDoneTasksToday(userId);

    return {
        user,
        countTotalTasks: totalTasks,
        countDoneTasksToday: doneTasksToday
    }
}