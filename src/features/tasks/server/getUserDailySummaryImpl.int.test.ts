// @vitest-environment node
import {describe, it, expect, beforeEach, afterAll} from "vitest";
import {getUserDailySummaryImpl} from "@/features/tasks/server/task.server.ts";
import {prisma} from "@/server/prisma.server.ts";

describe("getUserDailySummaryImpl - Integration Test", () => {

    let userId: string;

    beforeEach(async () => {
        await prisma.doneTask.deleteMany();
        await prisma.task.deleteMany();
        await prisma.user.deleteMany();

        const user = await prisma.user.create({
            data: {
                name: "Test",
                email: "test@user.test"
            }
        });

        userId = user.id;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("returns today’s tasks count when there are tasks for today", async () => {

        const today = new Date();
        const task = await prisma.task.create({
            data: {
                label: "Task 1",
                userId: userId,
            }
        });

        await prisma.doneTask.create({
            data: {
                userId: userId,
                taskId: task.id,
                doneAt: today
            }
        });

        const result = await getUserDailySummaryImpl(userId);
        expect(result.type).toBe("today");
        expect(result.count).toBe(1);
    });

    it("returns yesterday's tasks count when there are tasks for yesterday", async () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const task = await prisma.task.create({
            data: {
                label: "Task 1",
                userId: userId,
            }
        });
        await prisma.doneTask.create({
            data: {
                userId: userId,
                taskId: task.id,
                doneAt: yesterday
            }
        });

        const result = await getUserDailySummaryImpl(userId);
        expect(result.type).toBe("yesterday");
        expect(result.count).toBe(1);
    })

    it ("returns 0 when there are no tasks for today or yesterday", async () => {

        const result = await getUserDailySummaryImpl(userId);
        expect(result.type).toBe("none");
        expect(result.count).toBe(0);
    });

});