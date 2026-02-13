import {useState} from "react";
import {TaskActionStatus} from "@/features/tasks/ui/taskAction.types.ts";
import {addDoneTaskServer} from "@/features/tasks/server/addDoneTask.functions.ts";

export function useAddDoneTask() {
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<TaskActionStatus>("idle");

    async function submit(task: string) {

        setStatus("submitting");

        try {
            const result = await addDoneTaskServer({data: {label: task, userId: 1}});
            setMessage(result.message);
            setStatus("success");
        } catch (e) {
            console.error(e);
            setMessage("Please enter a task label");
            setStatus("error");
        }
    }

    return {submit, message, status};
}