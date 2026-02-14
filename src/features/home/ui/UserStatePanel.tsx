import clsx from "clsx";
import {computePraiseScale} from "@/features/home/domain/computePraiseScale.ts";

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

    const scale = computePraiseScale(countDoneTasksToday);

    return (
        <section className={clsx("bg-(--surface) p-6 rounded-2xl shadow-md space-y-4 text-center")}>
            {praise &&
                <div className={clsx("text-praise text-(--celebration)")}
                     style={{transform: `scale(${scale})`}}>
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