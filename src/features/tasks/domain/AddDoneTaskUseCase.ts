import {taskSchema} from "@/features/tasks/domain/TaskSchema.ts";

import {TaskRepository} from "./ports/TaskRepository";
import {TaskClock} from "./ports/TaskClock";
import {TaskFeedbackGenerator} from "./ports/TaskFeedbackGenerator";
import {Task} from "./entities/Task";
import {DoneTask} from "./entities/DoneTask";
import {UseCase} from "@/features/tasks/domain/UseCase.ts";

export type AddDoneTaskInput = {
    label: string,
    userId: string
}

export type AddDoneTaskResponse = {
    task: Task,
    doneTask: DoneTask,
    message: string,
    dailyDoneCount: number
}

export class AddDoneTaskUseCase implements UseCase<AddDoneTaskInput, AddDoneTaskResponse> {

    constructor(
        private repository: TaskRepository,
        private clock: TaskClock,
        private feedbackGenerator: TaskFeedbackGenerator
    ) {
    }

    async execute(input: AddDoneTaskInput): Promise<AddDoneTaskResponse> {

        const {label, userId} = input;
        const parsed = taskSchema.parse({label});
        const now = this.clock.now();

        let task: Task | null = await this.repository.findTaskByLabel(parsed.label, userId);

        if (!task) {

            task = {
                label: parsed.label,
                userId
            } as Task;

            task = await this.repository.saveTask(task);
        }

        const doneTask = {
            userId,
            taskId: task.id,
            doneAt: now
        } as DoneTask;

        await this.repository.saveDoneTask(doneTask);

        return {
            task,
            doneTask,
            message: this.feedbackGenerator.generate(),
            dailyDoneCount: await this.repository.countDoneTasksByDate(userId, now)
        };
    }
}