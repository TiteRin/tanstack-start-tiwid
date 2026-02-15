import clsx from "clsx";
import {Star} from "lucide-react";

export type TaskCardProps = {
    label: string,
    stats: {
        totalDone?: number
        currentStreak?: number,
        lastDoneAt?: Date | null,
    },
    isFavorite?: boolean,
    onClick?: () => void,
    onToggleFavorite?: () => void,
}

export default function TaskCard(
    {
        label,
        stats: {
            totalDone = 1,
            currentStreak = 0,
            lastDoneAt = null,
        },
        isFavorite = false,
        onClick,
        onToggleFavorite,
    }: TaskCardProps) {

    const isDoneToday = lastDoneAt && lastDoneAt.toDateString() === new Date().toDateString();

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            className={clsx(
                "bg-(--surface) p-5 shadow-sm",
                "rounded-xl",
                "transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02]",
                "cursor-pointer",
                "select-none",
                isFavorite && "ring-2 ring-(--celebration)",
                {
                    "bg-(--primary/10)": isDoneToday
                }
            )}
        >
            <div className="flex flex-col items-center space-y-2">
                <div className="flex item-start justify-between space-x-4 mb-2">
                    <h3 className={clsx("text-xl", { "line-through text-(--text-secondary)": isDoneToday})}>{label}</h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite?.();
                        }}
                        className="transition-transform hover:scale-110"
                    >
                        <Star
                            className={clsx(
                                "w-5 h-5",
                                isFavorite
                                    ? "fill-(--celebration) text-(--celebration)"
                                    : "text-(--text-secondary)"
                            )}
                        />
                    </button>
                </div>
                <p className={clsx("text-base text-(--celebration) font-fantasy")}>
                    <span className="mr-1">
                        🌻
                    </span>
                    Total done: {totalDone}
                </p>
                {!!lastDoneAt && (
                    <p className={clsx("text-sm text-(--secondary)")}>
                    <span className="mr-1" aria-label="last done date">
                        📅
                    </span>
                        Last done: {lastDoneAt.toLocaleDateString()}
                    </p>
                )}
                {currentStreak > 1 && (
                    <p className={clsx("text-xs text-(--secondary)")}>
                    <span className="mr-1" aria-label="current streak">
                        🔥
                    </span>
                        {currentStreak} days streak!
                    </p>
                )}
            </div>
        </div>

    );
}