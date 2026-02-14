import clsx from "clsx";
import TaskForm from "@/features/tasks/ui/TaskForm.tsx";
import WelcomeBanner from "@/features/home/ui/WelcomeBanner.tsx";
import UserStatePanel from "@/features/home/ui/UserStatePanel.tsx";

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
    return (
        <div className={clsx("min-h-screen px-6 py-12 space-y-10")}>
            <WelcomeBanner name={user.name}/>
            <div className="bg-(--surface) rounded-lg shadow-md p-6">
                <TaskForm/>
            </div>
            <UserStatePanel praise={praise}
                            countTotalTasks={countTotalTasks}
                            countDoneTasksToday={countDoneTasksToday}/>
        </div>
    )
        ;
}