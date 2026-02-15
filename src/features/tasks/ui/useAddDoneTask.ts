import {useState} from "react";
import {TaskActionStatus} from "@/features/tasks/ui/taskAction.types.ts";
import {addDoneTaskServer} from "@/features/tasks/server/addDoneTask.functions.ts";
import {useHomeStore} from "@/features/home/state/home-store-provider.tsx";

type AddDoneTaskServer = typeof addDoneTaskServer;

export function useAddDoneTask(
    serverFn: AddDoneTaskServer = addDoneTaskServer,
) {
    const [status, setStatus] = useState<TaskActionStatus>("idle");

    const startOptimisticAddTask = useHomeStore(state => state.startOptimisticAddTask);
    const confirmAdd = useHomeStore(state => state.confirmAdd);
    const rollbackAdd = useHomeStore(state => state.rollbackAdd);

    async function submit(task: string) {

        setStatus("submitting");
        startOptimisticAddTask();

        try {
            const result = await serverFn({data: {label: task}});
            setStatus("success");
            confirmAdd({countTotalTasks: result.totalTasksCount});
            return result;
        } catch (e) {
            console.error(e);
            setStatus("error");
            rollbackAdd();
            return null
        }
    }

    return {submit, status};
}