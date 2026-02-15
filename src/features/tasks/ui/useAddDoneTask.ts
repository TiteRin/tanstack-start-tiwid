import {useState} from "react";
import {TaskActionStatus} from "@/features/tasks/ui/taskAction.types.ts";
import {addDoneTaskServer} from "@/features/tasks/server/addDoneTask.functions.ts";
import {useHomeStore} from "@/features/home/state/useHomeStore.ts";

type AddDoneTaskServer = typeof addDoneTaskServer;

export function useAddDoneTask(
    serverFn: AddDoneTaskServer = addDoneTaskServer,
) {
    const [status, setStatus] = useState<TaskActionStatus>("idle");
    const store = useHomeStore({
        praise: "",
        countTotalTasks: 0,
        countDoneTasksToday: 0
    });

    async function submit(task: string) {

        setStatus("submitting");
        store.startOptimisticAddTask();

        try {
            const result = await serverFn({data: {label: task}});
            setStatus("success");
            store.confirmAdd({countTotalTasks: result.totalTasksCount});
            return result;
        } catch (e) {
            console.error(e);
            setStatus("error");
            store.rollbackAdd();
            return null
        }
    }

    return {submit, status};
}