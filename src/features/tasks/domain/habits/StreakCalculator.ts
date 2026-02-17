import {normalizeDate, getISOWeek, getISOYear} from "@/features/tasks/domain/streak/date.utils.ts";

export type StreakPattern =
    | { type: 'daily', value: number }
    | { type: 'weekly', value: number }
    | { type: 'monthly', value: number }
    | { type: "none", value: 0 }


export class StreakCalculator {

    calculateStreak(dates: Date[], now: Date): { dailyStreak: number, weeklyStreak: number, monthlyStreak: number } {

        if (dates.length === 0) {
            return {dailyStreak: 0, weeklyStreak: 0, monthlyStreak: 0}
        }

        const normalizeNow = normalizeDate(now);

        const sorted = dates
            .map(normalizeDate)
            .sort((a, b) => b.getTime() - a.getTime());

        let dailyStreak = 0;
        let weeklyStreak = 0;
        let monthlyStreak = 0;

        let cursorDay: Date | null = normalizeNow;
        let cursorWeek: number | null = getISOWeek(cursorDay);
        let cursorWeekYear: number | null = getISOYear(cursorDay);
        let cursorMonth: number | null = cursorDay.getMonth();
        let cursorMonthYear: number | null = getISOYear(cursorDay);

        let firstDay = sorted[0];
        let firstWeek = getISOWeek(firstDay);
        if (firstDay.getTime() !== normalizeNow.getTime()) {
            cursorDay = new Date(cursorDay);
            cursorDay.setDate(cursorDay.getDate() - 1);
        }
        if (firstWeek !== cursorWeek) {
            cursorWeek--;
        }
        if (cursorWeek === 0) {
            cursorWeek = 52;
            cursorWeekYear--;
        }
        if (firstDay.getMonth() !== cursorMonth) {
            cursorMonth--
        }

        if (cursorMonth === -1) {
            cursorMonth = 11;
            cursorMonthYear--;
        }

        for (const date of sorted) {

            if (!!cursorDay) {
                if (date.getTime() === cursorDay.getTime()) {
                    dailyStreak++;
                    cursorDay = new Date(cursorDay);
                    cursorDay.setDate(cursorDay.getDate() - 1);
                } else if (date.getTime() < cursorDay.getTime()) {
                    cursorDay = null;
                }
            }

            if (!!cursorWeek) {
                if (getISOWeek(date) === cursorWeek && getISOYear(date) === cursorWeekYear) {
                    weeklyStreak++;
                    cursorWeek--;
                } else if (getISOWeek(date) < cursorWeek) {
                    cursorWeek = null;
                    cursorWeekYear = null;
                }

                if (cursorWeek === 0) {
                    cursorWeek = 52;
                    // @ts-ignore
                    cursorWeekYear--;
                }
            }

            if (!!cursorMonth) {

                if (date.getMonth() === cursorMonth && getISOYear(date) === cursorMonthYear) {
                    monthlyStreak++;
                    cursorMonth--;
                } else if (date.getMonth() < cursorMonth) {
                    cursorMonth = null;
                    cursorMonthYear = null;
                }

                if (cursorMonth === -1) {
                    cursorMonth = 11;
                    // @ts-ignore
                    cursorMonthYear--;
                }
            }
        }

        return {
            dailyStreak,
            weeklyStreak,
            monthlyStreak
        }
    }

    calculate(dates: Date[], now: Date = new Date()): StreakPattern {

        const {dailyStreak, weeklyStreak, monthlyStreak} = this.calculateStreak(dates, now);
        return this.getBestStreak(dailyStreak, weeklyStreak, monthlyStreak);
    }

    getBestStreak(dailyStreak: number, weeklyStreak: number, monthlyStreak: number): StreakPattern {

        if (dailyStreak < 2 && weeklyStreak < 2 && monthlyStreak < 2) {
            return {type: "none", value: 0};
        }

        const maxStreak = Math.max(dailyStreak, weeklyStreak, monthlyStreak);

        if (maxStreak === dailyStreak) {
            return {type: 'daily', value: maxStreak};
        }

        if (maxStreak === weeklyStreak) {
            return {type: 'weekly', value: maxStreak};
        }

        if (maxStreak === monthlyStreak) {
            return {type: 'monthly', value: maxStreak};
        }

        return {type: "none", value: 0};
    }
}
