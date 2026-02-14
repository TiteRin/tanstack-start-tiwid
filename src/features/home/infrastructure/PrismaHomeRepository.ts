import {prisma} from "@/server/prisma.server"
import {HomeRepository} from "@/features/home/server/getHomePageData.ts";

export class PrismaHomeRepository implements HomeRepository {

    async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {id: true, name: true}
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async getDailySummary(userId: string) {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const count = await prisma.doneTask.count({
            where: {
                userId,
                doneAt: {
                    gte: start,
                    lte: end
                }
            }
        });

        if (count === 0) {
            return null;
        }

        return `You've already done ${count} tasks today`;
    }

    async countTotalTasks(userId: string) {
        return prisma.task.count({where: {userId}});
    }

    async countDoneTasksToday(userId: string) {

        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return prisma.doneTask.count({
            where: {
                userId,
                doneAt: {
                    gte: start,
                    lte: end
                }
            }
        });
    }


}