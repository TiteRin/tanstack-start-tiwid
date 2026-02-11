import {TaskRepository} from "@/features/tasks/domain/ports/TaskRepository.ts";
import {Task} from "@/features/tasks/domain/entities/Task.ts";
import {DoneTask} from "@/features/tasks/domain/entities/DoneTask.ts";

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