import {TaskRepository} from "@/features/tasks/domain/ports/TaskRepository.ts";
import {Task} from "@/features/tasks/domain/entities/Task.ts";
import { prisma } from "@/server/prisma.server.ts";
import {DoneTask} from "@/features/tasks/domain/entities/DoneTask.ts";

export class PrismaTaskRepository implements TaskRepository {

    async findTaskByLabel(label: string, userId: number): Promise<Task | null> {
        return prisma.task.findFirst({where: {label, userId}});
    }

    async saveDoneTask(doneTask: DoneTask): Promise<DoneTask> {
        return prisma.doneTask.create({
            data: {
                userId: doneTask.userId,
                taskId: doneTask.taskId,
                doneAt: doneTask.doneAt
            }
        });
    }

    async saveTask(task: Task): Promise<Task> {
        return prisma.task.create({
            data: {
                label: task.label,
                userId: task.userId
            }
        });
    }

    async countDoneTasksByDate(userId: number, date: Date): Promise<number> {

        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);

        return prisma.doneTask.count({where: {userId, doneAt: {gte: start, lte: end}}});
    }
}