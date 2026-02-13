import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTaskAction.ts";
import {RandomFeedbackGenerator} from "@/features/tasks/infrastructure/RandomFeedbackGenerator.ts";
import {GetUserDailySummary} from "@/features/tasks/domain/GetUserDailySummary.ts";
import {PrismaTaskRepository} from "@/features/tasks/infrastructure/PrismaTaskRepository.ts";

const clock = {
    now: () => new Date(),
}


export function createAddDoneTaskAction() {
    return new AddDoneTaskAction(
        new PrismaTaskRepository(),
        clock,
        new RandomFeedbackGenerator()
    );
}


export function createGetUserDailySummary() {
    const clock = {now: () => new Date()};

    return new GetUserDailySummary(
        new PrismaTaskRepository(),
        clock
    );
}
