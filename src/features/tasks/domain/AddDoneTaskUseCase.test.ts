import {describe, it, expect, vi} from "vitest";
import {AddDoneTaskUseCase} from "./AddDoneTaskUseCase.ts";
import {TaskRepository} from "@/features/tasks/domain/ports/TaskRepository.ts";
import {TaskClock} from "@/features/tasks/domain/ports/TaskClock.ts";
import {TaskFeedbackGenerator} from "@/features/tasks/domain/ports/TaskFeedbackGenerator.ts";
import {Task} from "@/features/tasks/domain/entities/Task.ts";

describe("AddDoneTask (domain)", () => {

    const fakeRepository: TaskRepository = {
        findTaskByLabel: async () => null,
        saveTask: async (task: any) => task,
        saveDoneTask: async (doneTask: any) => doneTask,
        countDoneTasksByDate: async () => 0
    }
    const fakeClock: TaskClock = {
        now: () => new Date(),
    };
    const fakeFeedbackGenerator: TaskFeedbackGenerator = {
        generate: () => "Amazing!"
    };

    it('creates an new task and a doneTask if task does not exist', async () => {

        const action = new AddDoneTaskUseCase(fakeRepository, fakeClock, fakeFeedbackGenerator);

        const result = await action.execute({label: "I ran some errands", userId: "user-1"});

        expect(result.task.label).toBe("I ran some errands");
        expect(result.doneTask.taskId).toBe(result.task.id);
    });

    it('does not create a new task if task already exists', async () => {

        const task: Task = {
            id: 1,
            label: "I ran some errands",
            userId: "user-1",
        }


        const spyRepository: TaskRepository = {
            findTaskByLabel: vi.fn(async () => task),
            saveTask: vi.fn(async (task: Task) => task),
            saveDoneTask: vi.fn(async (doneTask) => doneTask),
            countDoneTasksByDate: vi.fn(async () => 0),
        };

        const action = new AddDoneTaskUseCase(spyRepository, fakeClock, fakeFeedbackGenerator);
        const result = await action.execute({label: "I ran some errands", userId: "user-1"});

        expect(result.task.id).toBe(task.id);
        expect(spyRepository.findTaskByLabel).toHaveBeenCalledWith("I ran some errands", "user-1");
        expect(spyRepository.saveTask).not.toHaveBeenCalled();
        expect(spyRepository.saveDoneTask).toHaveBeenCalled();
    });

    it("should fail when the label is empty", async () => {

        const action = new AddDoneTaskUseCase(fakeRepository, fakeClock, fakeFeedbackGenerator);
        await expect(() => action.execute({label: "", userId: "user-1"})).rejects.toThrow();
    });


    it("uses injected Clock for doneAt", async () => {

        const fixedDate = new Date(2025, 2, 10);
        const injectedClock: TaskClock = {
            now: () => fixedDate,
        }

        const action = new AddDoneTaskUseCase(fakeRepository, injectedClock, fakeFeedbackGenerator);
        const result = await action.execute({label: "I ran some errands", userId: "user-1"});
        expect(result.doneTask.doneAt).toBe(fixedDate);
    });


    it("returns a generated feedback message on success", async () => {

        const stubFeedback = {
            generate: () => "Amazing!"
        };

        const action = new AddDoneTaskUseCase(
            fakeRepository, fakeClock, stubFeedback as any
        );

        const result = await action.execute({label: "I ran some errands", userId: "user-1"});
        expect(result.message).toBe("Amazing!");
    });

});
