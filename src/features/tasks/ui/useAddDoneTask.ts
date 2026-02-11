import {useState} from "react";
import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTask.ts";

const feedback = "A task has been added!"

export function useAddDoneTask(
    action: AddDoneTaskAction
) {
    const [message, setMessage] = useState<string>("");

    async function submit(task: string) {

        try {
            const result = action.execute(task, 1);
            setMessage(result.message ?? feedback);
        } catch (e) {
            console.error(e);
            setMessage("Please enter a task label");
        }
    }

    return {submit, message};
}