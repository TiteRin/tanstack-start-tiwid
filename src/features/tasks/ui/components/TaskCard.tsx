import clsx from "clsx";
import {Star} from "lucide-react";
import {useState} from "react";

export type TaskCardProps = {
    label: string,
    totalDone?: number,
    currentStreak?: number,
    lastDone?: Date | null,
    isFavorite?: boolean,
    onClick?: () => void,
    onToggleFavorite?: () => void,
}

export default function TaskCard(
    {
        label,
        totalDone = 1,
        currentStreak = 0,
        lastDone = null,
        isFavorite = false,
        onClick,
        onToggleFavorite,
    }: TaskCardProps) {

    const [optimisticIsFavorite, setOptimisticIsFavorite] = useState(isFavorite);
    const [optimisticTotalDone, setOptimisticTotalDone] = useState(totalDone);
    const [optimisticLastDone, setOptimisticLastDone] = useState(lastDone);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setOptimisticTotalDone(optimisticTotalDone + 1);
                setOptimisticLastDone(new Date());
                onClick?.();
            }}
            className={clsx(
                "bg-(--surface) p-5 shadow-sm",
                "rounded-xl",
                "transition-all duration-200",
                "hover:shadow-md hover:scale-[1.02]",
                "cursor-pointer",
                "select-none",
                optimisticIsFavorite && "ring-2 ring-(--celebration)"
            )}
        >
            <div className="flex flex-col items-center space-y-2">
                <div className="flex item-start justify-between space-x-4 mb-2">
                    <h3 className={clsx("text-xl")}>{label}</h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOptimisticIsFavorite(!optimisticIsFavorite);
                            onToggleFavorite?.();
                        }}
                        className="transition-transform hover:scale-110"
                    >
                        <Star
                            className={clsx(
                                "w-5 h-5",
                                optimisticIsFavorite
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
                    Total done: {optimisticTotalDone}
                </p>
                {!!optimisticLastDone && (
                    <p className={clsx("text-sm text-(--secondary)")}>
                    <span className="mr-1" aria-label="last done date">
                        📅
                    </span>
                        Last done: {optimisticLastDone.toLocaleDateString()}
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