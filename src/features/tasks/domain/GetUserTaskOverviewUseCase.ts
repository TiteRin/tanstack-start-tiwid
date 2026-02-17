import {UseCase} from "@/features/tasks/domain/UseCase.ts";
import {TaskOverview} from "@/features/tasks/ui/components/TaskQuickList.tsx";

export interface TaskOverviewRepository {
    findTaskOverviewByUser: (userId: string) => Promise<Partial<TaskOverview>[]>
}

type GetUserTaskOverviewUseCaseInput = {
    userId: string
}

type GetUserTaskOverviewUseCaseOutput = {
    tasks: Partial<TaskOverview>[]
}

export class GetUserTaskOverviewUseCase implements UseCase<GetUserTaskOverviewUseCaseInput, GetUserTaskOverviewUseCaseOutput> {
    constructor(private repository: TaskOverviewRepository) {
    }

    async execute({userId}: GetUserTaskOverviewUseCaseInput): Promise<GetUserTaskOverviewUseCaseOutput> {
        const tasks = await this.repository.findTaskOverviewByUser(userId);

        const sorted = tasks.sort((taskA, taskB) => {
            if (taskA.isFavorite !== taskB.isFavorite) {
                return taskA.isFavorite ? -1 : 1;
            }

            const taskADate = taskA.stats?.lastDoneAt || new Date(0);
            const taskBDate = taskB.stats?.lastDoneAt || new Date(0);

            if( taskADate.getTime() !== taskBDate.getTime() ) {
                return taskBDate.getTime() - taskADate.getTime();
            }

            if (taskA.stats?.totalDone !== taskB.stats?.totalDone) {
                return (taskB.stats?.totalDone || 0) - (taskA.stats?.totalDone || 0);
            }

            return taskA.label.localeCompare(taskB.label);
        });

        return sorted.slice(0, 6);
    }

}