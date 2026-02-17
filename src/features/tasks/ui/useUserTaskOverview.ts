import {useEffect, useState} from "react";
import {TaskOverview} from "@/features/tasks/ui/components/TaskQuickList.tsx";
import {getUserTaskOverviewServer} from "@/features/home/server/getUserTaskOverview.functions.ts";

export function useUserTaskOverview() {

    const [tasks, setTasks] = useState<TaskOverview[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const load = async () => {
            const result = await getUserTaskOverviewServer({
                data: {userId: "1"}
            })
            setTasks(result);
            setIsLoading(false);
        };

        load();
    }, [])

    return {
        tasks,
        isLoading
    }
}