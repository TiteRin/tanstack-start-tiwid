import {describe, it, expect, vi} from "vitest";
import {AddDoneTaskAction, Clock, Task, TaskRepository} from "./AddDoneTask";

describe("AddDoneTask (domain)", () => {

    it('creates an new task and a doneTask if task does not exist', () => {
        const fakeRepo: TaskRepository = {
            findTaskByLabel: () => null,
            saveTask: (task: any) => task,
            saveDoneTask: (doneTask: any) => doneTask,
        };
        const fakeClock: Clock = {
            now: () => new Date(),
        }
        const action = new AddDoneTaskAction(fakeRepo, fakeClock);

        const result = action.execute("I ran some errands", 1);

        expect(result.task.label).toBe("I ran some errands");
        expect(result.doneTask.taskId).toBe(result.task.id);
    });

    it('does not create a new task if task already exists', () => {

        const task: Task = {
            id: "task-1",
            label: "I ran some errands",
            userId: 1,
        }


        const fakeRepo: TaskRepository = {
            findTaskByLabel: vi.fn(() => task),
            saveTask: vi.fn((task: Task) => task),
            saveDoneTask: vi.fn((doneTask) => doneTask),
        }
        const fakeClock: Clock = {
            now: () => new Date(),
        }
        const action = new AddDoneTaskAction(fakeRepo, fakeClock);
        const result = action.execute("I ran some errands", 1);

        expect(result.task.id).toBe(task.id);
        expect(fakeRepo.findTaskByLabel).toHaveBeenCalledWith("I ran some errands");
        expect(fakeRepo.saveTask).not.toHaveBeenCalled();
        expect(fakeRepo.saveDoneTask).toHaveBeenCalled();
    });

    it("should fail when the label is empty", () => {

        const fakeRepo: TaskRepository = {
            findTaskByLabel: () => null,
            saveTask: (task: any) => task,
            saveDoneTask: (doneTask: any) => doneTask,
        };
        const fakeClock: Clock = {
            now: () => new Date(),
        }
        const action = new AddDoneTaskAction(fakeRepo, fakeClock);
        expect(() => action.execute("", 1)).toThrow();
    });


    it("uses injected Clock for doneAt", () => {

        const fixedDate = new Date(2025, 2, 10);
        const fakeClock: Clock = {
            now: () => fixedDate,
        }

        const fakeRepo: TaskRepository = {
            findTaskByLabel: () => null,
            saveTask: (task: any) => task,
            saveDoneTask: (doneTask: any) => doneTask,
        };

        const action = new AddDoneTaskAction(fakeRepo, fakeClock);
        const result = action.execute("I ran some errands", 1);
        expect(result.doneTask.doneAt).toBe(fixedDate);
    });

});
