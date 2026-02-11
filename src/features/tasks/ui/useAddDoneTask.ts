import {useState} from "react";
import {AddDoneTaskAction, Clock} from "@/features/tasks/domain/AddDoneTask.ts";
import {InMemoryTaskRepository} from "@/features/tasks/infrastructure/InMemoryTaskRepository.ts";

const clock: Clock = {
    now: () => new Date(),
}

const feedback = "A task has been added!"

export function useAddDoneTask() {
    const [message, setMessage] = useState<string>("");

    const repository = new InMemoryTaskRepository();
    const action = new AddDoneTaskAction(repository, clock);

    async function submit(task: string) {

        try {
            action.execute(task, 1);
            setMessage(feedback);
        }
        catch (e) {
            console.error(e);
            setMessage("Please enter a task label");
        }
    }

    return {submit, message};
}