export type StreakPattern =
    | { type: 'daily', value: number }
    | { type: 'weekly', value: number }
    | { type: 'monthly', value: number }
    | { type: "none", value: 0 }


export class StreakCalculator {
    calculate(dates: Date[], now: Date = new Date()): StreakPattern {

        if (dates.length === 0) {
            return {type: "none", value: 0}
        }

        const normalise = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const normalizeNow = normalise(now);

        const sorted = dates
            .map(normalise)
            .sort((a, b) => b.getTime() - a.getTime());

        let streak = 0;

        let cursor = normalizeNow;
        const firstDate = sorted[0];
        if (firstDate.getTime() !== normalizeNow.getTime()) {
            cursor = new Date(cursor);
            cursor.setDate(cursor.getDate() - 1);
        }

        for (const date of sorted) {
            if (date.getTime() === cursor.getTime()) {
                streak++;
                cursor = new Date(cursor);
                cursor.setDate(cursor.getDate() - 1);
            } else if (date.getTime() < cursor.getTime()) {
                break;
            }
        }

        if (streak >= 2) {
            return {type: 'daily', value: streak};
        }

        return {type: "none", value: 0};
    }
}
