import {Task} from "@/features/tasks/domain/entities/Task.ts";
import {DoneTask} from "@/features/tasks/domain/entities/DoneTask.ts";

export interface TaskRepository {
    findTaskByLabel: (label: string) => Task | null;
    saveTask: (task: Task) => Task;
    saveDoneTask: (doneTask: DoneTask) => DoneTask;
}