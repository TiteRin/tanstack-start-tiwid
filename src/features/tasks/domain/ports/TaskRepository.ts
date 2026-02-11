import {DoneTask, Task} from "@/features/tasks/domain/AddDoneTask.ts";

export interface TaskRepository {
    findTaskByLabel: (label: string) => Task | null;
    saveTask: (task: Task) => Task;
    saveDoneTask: (doneTask: DoneTask) => DoneTask;
}