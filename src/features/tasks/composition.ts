import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTask.ts";
import {InMemoryTaskRepository} from "@/features/tasks/infrastructure/InMemoryTaskRepository.ts";
import {RandomFeedbackGenerator} from "@/features/tasks/infrastructure/RandomFeedbackGenerator.ts";
import {GetUserDailySummary, GetUserDailySummaryRepository} from "@/features/tasks/domain/GetUserDailySummary.ts";

const clock = {
    now: () => new Date(),
}


export function createAddDoneTaskAction() {
    return new AddDoneTaskAction(
        new InMemoryTaskRepository() as any,
        clock,
        new RandomFeedbackGenerator()
    );
}


export function createGetUserDailySummary() {
    const clock = {now: () => new Date()};

    return new GetUserDailySummary(
        new InMemoryTaskRepository() as unknown as GetUserDailySummaryRepository,
        clock
    );
}
