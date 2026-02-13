import {PrismaTaskRepository} from "@/features/tasks/infrastructure/PrismaTaskRepository.ts";
import {GetUserDailySummaryAction} from "@/features/tasks/domain/GetUserDailySummaryAction.ts";
import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTaskAction.ts";
import {RandomFeedbackGenerator} from "@/features/tasks/infrastructure/RandomFeedbackGenerator.ts";

const clock = {
    now: () => new Date(),
}

export async function getUserDailySummaryImpl(userId: number) {

    const repo = new PrismaTaskRepository();
    const useCase = new GetUserDailySummaryAction(repo, clock);
    return useCase.execute(userId);
}

export async function addDoneTaskImpl(label: string, userId: number) {

    const repo = new PrismaTaskRepository();
    const action = new AddDoneTaskAction(repo, clock, new RandomFeedbackGenerator());
    return action.execute(label, userId);
}