import {taskSchema} from "@/features/tasks/domain/TaskSchema.ts";

import {TaskRepository} from "./ports/TaskRepository";
import {TaskClock} from "./ports/TaskClock";
import {TaskFeedbackGenerator} from "./ports/TaskFeedbackGenerator";
import {Task} from "./entities/Task";
import {DoneTask} from "./entities/DoneTask";

export class AddDoneTaskAction {

    constructor(
        private repository: TaskRepository,
        private clock: TaskClock,
        private feedbackGenerator: TaskFeedbackGenerator
    ) {
    }

    async execute(label: string, userId: number) {

        const parsed = taskSchema.parse({label});

        let task: Task | null = this.repository.findTaskByLabel(parsed.label);

        if (!task) {

            task = {
                id: crypto.randomUUID(),
                label: parsed.label,
                userId
            } as Task;

            task = this.repository.saveTask(task);
        }

        const doneTask: DoneTask = {
            id: crypto.randomUUID(),
            userId,
            taskId: task.id,
            doneAt: this.clock.now()
        }

        this.repository.saveDoneTask(doneTask);

        return {
            task,
            doneTask,
            message: this.feedbackGenerator.generate()
        };
    }
}