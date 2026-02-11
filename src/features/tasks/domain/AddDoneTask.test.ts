import {describe, it, expect} from "vitest";
import {AddDoneTaskAction, TaskRepository} from "./AddDoneTask";

describe("AddDoneTask (domain)", () => {

    it('creates an new task and a doneTask if task does not exist', () => {
        const fakeRepo: TaskRepository = {
            findTaskByLabel: () => null,
            saveTask: (task: any) => task,
            saveDoneTask: (doneTask: any) => doneTask,
        };
        const action = new AddDoneTaskAction(fakeRepo);

        const result = action.execute("I ran some errands", 1);

        expect(result.task.label).toBe("I ran some errands");
        expect(result.doneTask.taskId).toBe(result.task.id);
    });


});
