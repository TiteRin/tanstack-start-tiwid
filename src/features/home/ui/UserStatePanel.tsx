import clsx from "clsx";

type UserStatePanelProps = {
    praise?: string,
    dailySummary?: string,
    totalTasks: number
}

export default function UserStatePanel(
    {
        praise, dailySummary, totalTasks
    }: UserStatePanelProps
) {
    return (
        <section className={clsx("bg-(--surface) p-6 rounded-2xl shadow-md space-y-4 text-center")}>
            {praise &&
                <div className={clsx("text-praise text-(--celebration)")}>
                    <p>{praise}</p>
                </div>
            }

            {dailySummary &&
                <p className={clsx("text-(--accent)")}>{dailySummary}</p>
            }

            {totalTasks > 0 &&
                <p className={clsx("text-(--secondary) text-sm")}>
                    Total tasks in your forever Done List: {totalTasks}
                </p>
            }
        </section>
    )
}