import {taskSchema} from "@/features/tasks/domain/TaskSchema.ts";

type Task = {
    id: string;
    label: string;
    userId: number;
}

type DoneTask = {
    id: string;
    userId: number;
    taskId: string;
    doneAt: Date;
}

interface TaskRepository {
    findTaskByLabel: (label: string) => Task | null;
    saveTask: (task: Task) => Task;
    saveDoneTask: (doneTask: DoneTask) => DoneTask;
}

export class AddDoneTaskAction {

    constructor(private repository: TaskRepository) {
    }

    execute(label: string, userId: number) {

        const parsed = taskSchema.parse({label});

        let task: Task | null = this.repository.findTaskByLabel();

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
            doneAt: new Date
        }

        this.repository.saveDoneTask(doneTask);

        return {task, doneTask};
    }
}

export type {TaskRepository}
