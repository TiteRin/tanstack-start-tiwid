// @vitest-environment node
import {describe, it, expect, beforeEach, afterAll} from "vitest";
import {addDoneTaskImpl} from "@/features/tasks/server/task.server.ts";
import {prisma} from "@/server/prisma.server.ts";

describe("addDoneTaskImpl - Integration Test", () => {

    let userId: number;

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

    it("creates a task and a doneTask in the database", async () => {
        const result = await addDoneTaskImpl("I ran some errands", userId);

        expect(result.task.label).toBe("I ran some errands");
        expect(result.message).toBeDefined();

        const tasks = await prisma.task.findMany();
        const doneTasks = await prisma.doneTask.findMany();

        expect(tasks.length).toBe(1)
        expect(doneTasks.length).toBe(1);
    });
})