import clsx from "clsx";
import TaskForm from "@/features/tasks/ui/TaskForm.tsx";
import WelcomeBanner from "@/features/home/ui/WelcomeBanner.tsx";
import UserStatePanel from "@/features/home/ui/UserStatePanel.tsx";
import {signOut} from "@/lib/auth-client.ts";
import {Button} from "@/components/ui/Button.tsx";
import {useNavigate} from "@tanstack/react-router";

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
            <UserStatePanel praise={praise}
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