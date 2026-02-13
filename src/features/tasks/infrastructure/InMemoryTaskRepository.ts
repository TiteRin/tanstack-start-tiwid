import {TaskRepository} from "@/features/tasks/domain/ports/TaskRepository.ts";
import {Task} from "@/features/tasks/domain/entities/Task.ts";
import {DoneTask} from "@/features/tasks/domain/entities/DoneTask.ts";

export class InMemoryTaskRepository implements TaskRepository {
    private tasks: Task[] = [];
    private doneTasks: DoneTask[] = [];

    async findTaskByLabel(label: string, userId: number): Promise<Task | null> {
        return this.tasks.find(task => task.label === label && task.userId === userId) ?? null
    }

    async saveTask(task: Task) {
        this.tasks.push(task);
        return task;
    }

    async saveDoneTask(doneTask: DoneTask) {
        this.doneTasks.push(doneTask);
        return doneTask;
    }

    async countDoneTasksByDate(_userId: number, _date: Date): Promise<number> {
        return 0;
    }
}