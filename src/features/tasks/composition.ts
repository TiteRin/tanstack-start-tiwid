import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTask.ts";
import {InMemoryTaskRepository} from "@/features/tasks/infrastructure/InMemoryTaskRepository.ts";

const clock = {
    now: () => new Date(),
}

export function createAddDoneTaskAction() {
    return new AddDoneTaskAction(new InMemoryTaskRepository(), clock);
}