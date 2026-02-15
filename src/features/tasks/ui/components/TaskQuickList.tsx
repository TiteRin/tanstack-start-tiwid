import TaskCard from "@/features/tasks/ui/components/TaskCard.tsx";

export type TaskOverview = {
    id: string,
    label: string,
    isFavorite: boolean,
    stats: {
        totalDone: number,
        currentStreak?: number,
        lastDoneAt?: Date
    }
}

type TaskQuickListProps = {
    tasks: TaskOverview[],
    onTaskClick?: (id: string) => void,
    onToggleFavorite?: (id: string) => void
}

export default function TaskQuickList(
    {
        tasks,
        onTaskClick,
        onToggleFavorite
    }: TaskQuickListProps) {

    if (tasks.length === 0) {
        return;
    }

    const limitedTasks = tasks.slice(0, 6);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {limitedTasks.map(task => (
                <TaskCard key={task.id}
                          label={task.label}
                          stats={task.stats}
                          isFavorite={task.isFavorite}
                          onClick={() => onTaskClick?.(task.id)}
                          onToggleFavorite={() => onToggleFavorite?.(task.id)}
                />
            ))}
        </div>
    )
}