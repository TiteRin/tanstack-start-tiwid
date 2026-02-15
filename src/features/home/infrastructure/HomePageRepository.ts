export interface HomePageRepository {
    getUserById(userId: string): Promise<{ id: string, name: string }>;
    countTotalTasks(userId: string): Promise<number>;
    countDoneTasksToday(userId: string): Promise<number>;
}