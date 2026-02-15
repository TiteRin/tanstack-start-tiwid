import clsx from "clsx";
import TaskForm from "@/features/tasks/ui/TaskForm.tsx";
import WelcomeBanner from "@/features/home/ui/WelcomeBanner.tsx";
import UserStatePanel from "@/features/home/ui/UserStatePanel.tsx";
import {signOut} from "@/lib/auth-client.ts";
import {Button} from "@/components/ui/Button.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useState} from "react";
import {useHomeStore} from "@/features/home/state/useHomeStore.ts";

export type HomePageProps = {
    user: {
        id: string
        name: string
    },
    praise: string,
    countTotalTasks: number,
    countDoneTasksToday: number
}

export default function HomePage(
    {
        user,
        praise,
        countTotalTasks,
        countDoneTasksToday
    }: HomePageProps) {
    const navigate = useNavigate();

    const [optimisticPraise, setOptimisticPraise] = useState<string | null>(praise ? praise : null);
    const [optimisticCountToday, setOptimisticCountToday] = useState<number>(countDoneTasksToday);
    const [optimisticCountTotal, setOptimisticCountTotal] = useState<number>(countTotalTasks);

    const state = useHomeStore({
        praise,
        countTotalTasks,
        countDoneTasksToday
    });

    const handleLogout = async () => {
        await signOut();
        await navigate({to: "/"});
    }

    const handleOptimisticAddTask = (message: string) => {
        state.optimisticAddTask(message);
    }

    return (
        <div className={clsx("min-h-screen px-6 py-12 space-y-10")}>
            <WelcomeBanner name={user.name}/>
            <div className="bg-(--surface) rounded-lg shadow-md p-6">
                <TaskForm onTaskAdded={handleOptimisticAddTask}/>
            </div>
            <UserStatePanel praise={state.praise || undefined}
                            countTotalTasks={state.countTotalTasks}
                            countDoneTasksToday={state.countDoneTasksToday}/>

            <div className="flex justify-center">
                <Button variant="ghost" onClick={handleLogout} className="w-full">
                    Déconnexion
                </Button>
            </div>

        </div>
    )
}