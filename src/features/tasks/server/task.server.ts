import {PrismaTaskRepository} from "@/features/tasks/infrastructure/PrismaTaskRepository.ts";
import {GetUserDailySummaryUseCase} from "@/features/tasks/domain/GetUserDailySummaryUseCase.ts";
import {AddDoneTaskUseCase} from "@/features/tasks/domain/AddDoneTaskUseCase.ts";
import {RandomFeedbackGenerator} from "@/features/tasks/infrastructure/RandomFeedbackGenerator.ts";

const clock = {
    now: () => new Date(),
}

export async function getUserDailySummaryImpl(userId: number) {

    const repo = new PrismaTaskRepository();
    const useCase = new GetUserDailySummaryUseCase(repo, clock);
    return useCase.execute(userId);
}

export async function addDoneTaskImpl(label: string, userId: number) {

    const repo = new PrismaTaskRepository();
    const action = new AddDoneTaskUseCase(repo, clock, new RandomFeedbackGenerator());
    return action.execute(label, userId);
}