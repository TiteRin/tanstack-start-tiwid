import {useState} from "react";
import {TaskActionStatus} from "@/features/tasks/ui/taskAction.types.ts";
import {addDoneTaskServer} from "@/features/tasks/server/addDoneTask.functions.ts";

type AddDoneTaskServer = typeof addDoneTaskServer;

export function useAddDoneTask(serverFn: AddDoneTaskServer = addDoneTaskServer) {
    const [message, setMessage] = useState<string>("");
    const [status, setStatus] = useState<TaskActionStatus>("idle");

    async function submit(task: string) {

        setStatus("submitting");

        try {
            const result = await serverFn({data: {label: task}});
            setMessage(result.message);
            setStatus("success");
            return result;
        } catch (e) {
            console.error(e);
            setMessage((e as any).message);
            setStatus("error");
            return null
        }
    }

    return {submit, message, status};
}