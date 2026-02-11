import {useState} from "react";
import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTask.ts";

const feedback = "A task has been added!"

type TaskActionStatus = "idle" | "submitting" | "success" | "error";

export function useAddDoneTask(
    action: AddDoneTaskAction
) {
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<TaskActionStatus>("idle");

    async function submit(task: string) {

        setStatus("submitting");

        try {
            const result = await action.execute(task, 1);
            setMessage(result.message ?? feedback);
            setStatus("success");
        } catch (e) {
            console.error(e);
            setMessage("Please enter a task label");
            setStatus("error");
        }
    }

    return {submit, message, status};
}