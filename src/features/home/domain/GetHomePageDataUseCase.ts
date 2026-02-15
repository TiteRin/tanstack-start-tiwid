import {HomePageData} from "@/features/home/types.ts";
import {UseCase} from "@/features/tasks/domain/UseCase.ts";

type GetHomePageDataRepository = {
    getUserById(userId: string): Promise<{ id: string, name: string }>;
    countTotalTasks(userId: string): Promise<number>;
    countDoneTasksToday(userId: string): Promise<number>;
}

export type GetHomePageDataInput = {
    userId: string;
}

export type GetHomePageDataOutput = HomePageData

export class GetHomePageDataUseCase implements UseCase<GetHomePageDataInput, GetHomePageDataOutput> {
    constructor(private repository: GetHomePageDataRepository) {
    }

    async execute({userId}: GetHomePageDataInput): Promise<GetHomePageDataOutput> {
        const [user, totalTasks, doneTasksToday] = await Promise.all([
            this.repository.getUserById(userId),
            this.repository.countTotalTasks(userId),
            this.repository.countDoneTasksToday(userId)
        ]);

        return {
            user,
            countTotalTasks: totalTasks,
            countDoneTasksToday: doneTasksToday
        }
    }
}