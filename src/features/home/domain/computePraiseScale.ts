export function computePraiseScale(dailyDoneTasksCount: number) {
    if (dailyDoneTasksCount === 0) {
        return 1;
    }

    const raw = 1 + Math.log10(dailyDoneTasksCount + 1);

    return Math.min(raw, 2);
}