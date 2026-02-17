import clsx from "clsx";
import TaskForm from "@/features/tasks/ui/TaskForm.tsx";
import WelcomeBanner from "@/features/home/ui/WelcomeBanner.tsx";
import UserStatePanel from "@/features/home/ui/UserStatePanel.tsx";
import TaskQuickList from "@/features/tasks/ui/components/TaskQuickList.tsx";
import {signOut} from "@/lib/auth-client.ts";
import {Button} from "@/components/ui/Button.tsx";
import {useNavigate} from "@tanstack/react-router";
import {useHomeStore} from "@/features/home/state/home-store-provider.tsx";
import {useUserTaskOverview} from "@/features/tasks/ui/useUserTaskOverview.ts";

export type HomePageProps = {
    user: {
        id: string
        name: string
    },
}

export default function HomePage({user}: HomePageProps) {
    const navigate = useNavigate();

    const praise = useHomeStore(s => s.praise);
    const countTotalTasks = useHomeStore(s => s.countTotalTasks);
    const countDoneTasksToday = useHomeStore(s => s.countDoneTasksToday);

    const {tasks, isLoading} = useUserTaskOverview();

    const handleLogout = async () => {
        await signOut();
        await navigate({to: "/"});
    }

    return (
        <div className={clsx("min-h-screen px-6 py-12 space-y-10")}>
            <WelcomeBanner name={user.name}/>
            <div className="bg-(--surface) rounded-lg shadow-md p-6">
                <TaskForm/>
            </div>
            <div className="mt-8">
                {isLoading ?
                    (<p>Loading…</p>) :
                    (
                        <TaskQuickList tasks={tasks}/>
                    )
                }
            </div>
            <UserStatePanel praise={praise || undefined}
                            countTotalTasks={countTotalTasks}
                            countDoneTasksToday={countDoneTasksToday}/>

            <div className="flex justify-center">
                <Button variant="ghost" onClick={handleLogout} className="w-full">
                    Déconnexion
                </Button>
            </div>


        </div>
    )
}