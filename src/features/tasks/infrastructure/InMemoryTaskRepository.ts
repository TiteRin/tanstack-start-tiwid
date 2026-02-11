import {DoneTask, Task, TaskRepository} from "@/features/tasks/domain/AddDoneTask.ts";

export class InMemoryTaskRepository implements TaskRepository {
    private tasks: Task[] = [];
    private doneTasks: DoneTask[] = [];

    findTaskByLabel(label: string): Task | null {
        return this.tasks.find(task => task.label === label) ?? null
    }

    saveTask(task: Task) {
        this.tasks.push(task);
        return task;
    }

    saveDoneTask(doneTask: DoneTask) {
        this.doneTasks.push(doneTask);
        return doneTask;
    }
}