import {Task} from "@/features/tasks/domain/entities/Task.ts";
import {DoneTask} from "@/features/tasks/domain/entities/DoneTask.ts";

export interface TaskRepository {
    findTaskByLabel: (label: string, userId: number) => Promise<Task | null>;
    countDoneTasksByDate: (userId: number, date: Date) => Promise<number>;
    saveTask: (task: Task) => Promise<Task>;
    saveDoneTask: (doneTask: DoneTask) => Promise<DoneTask>;
}