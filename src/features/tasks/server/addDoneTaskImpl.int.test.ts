// @vitest-environment node
import {describe, it, expect, beforeEach, afterAll} from "vitest";
import {PrismaClient} from "@prisma/client";
import {addDoneTaskImpl} from "@/features/tasks/server/task.server.ts";

const prisma = new PrismaClient();

describe("addDoneTaskImpl - Integration Test", () => {

    beforeEach(async () => {
        await prisma.doneTask.deleteMany();
        await prisma.task.deleteMany();
        await prisma.user.deleteMany();

        await prisma.user.create({
            data: {
                name: "Test",
                email: "test@user.test"
            }
        })
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("creates a task and a doneTask in the database", async () => {
        const result = await addDoneTaskImpl("I ran some errands", 1);

        expect(result.task.label).toBe("I ran some errands");
        expect(result.message).toBeDefined();

        const tasks = await prisma.task.findMany();
        const doneTasks = await prisma.doneTask.findMany();

        expect(tasks.length).toBe(1)
        expect(doneTasks.length).toBe(1);
    });
})