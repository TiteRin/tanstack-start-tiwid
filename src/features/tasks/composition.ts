import {AddDoneTaskUseCase} from "@/features/tasks/domain/AddDoneTaskUseCase.ts";
import {GetUserDailySummaryUseCase} from "@/features/tasks/domain/GetUserDailySummaryUseCase.ts";
import {PrismaTaskRepository} from "@/features/tasks/infrastructure/PrismaTaskRepository.ts";

const clock = {
    now: () => new Date(),
}


export function createAddDoneTaskAction() {
    return new AddDoneTaskUseCase(
        new PrismaTaskRepository(),
        clock
    );
}


export function createGetUserDailySummary() {
    const clock = {now: () => new Date()};

    return new GetUserDailySummaryUseCase(
        new PrismaTaskRepository(),
        clock
    );
}
