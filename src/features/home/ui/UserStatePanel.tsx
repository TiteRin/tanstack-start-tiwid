import clsx from "clsx";

type UserStatePanelProps = {
    praise?: string,
    countTotalTasks: number,
    countDoneTasksToday: number
}

export default function UserStatePanel(
    {
        praise, countTotalTasks, countDoneTasksToday
    }: UserStatePanelProps
) {
    return (
        <section className={clsx("bg-(--surface) p-6 rounded-2xl shadow-md space-y-4 text-center")}>
            {praise &&
                <div className={clsx("text-praise text-(--celebration)")}>
                    <p>{praise}</p>
                </div>
            }

            {countDoneTasksToday > 0 &&
                <p className={clsx("text-(--accent)")}>You’ve done {countDoneTasksToday} tasks today!</p>
            }

            {countTotalTasks > 0 &&
                <p className={clsx("text-(--secondary) text-sm")}>
                    Total tasks in your forever Done List: {countTotalTasks}
                </p>
            }
        </section>
    )
}