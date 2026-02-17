import {describe, it, expect} from "vitest"
import {StreakCalculator} from "./StreakCalculator.ts"
import {getISOWeek} from "@/features/tasks/domain/streak/date.utils.ts";

describe("StreakCalculator", () => {
    describe("daily streak", () => {

        it("detects consecutive daily streak", () => {
            const calculator = new StreakCalculator();

            const now = new Date(2025, 4, 14);
            const dates = [
                new Date(2025, 4, 14),
                new Date(2025, 4, 13),
                new Date(2025, 4, 12),
                new Date(2025, 4, 11),
                new Date(2025, 4, 9),
                new Date(2025, 4, 8),
                new Date(2025, 4, 1),
            ];

            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "daily",
                value: 4
            });
        });

        it("multiples done task on the same day doesn’t impact the streak", () => {
            const calculator = new StreakCalculator();

            const now = new Date(2025, 4, 14);
            const dates = [
                new Date(2025, 4, 14),
                new Date(2025, 4, 13),
                new Date(2025, 4, 13),
                new Date(2025, 4, 12),
                new Date(2025, 4, 11),
                new Date(2025, 4, 9),
                new Date(2025, 4, 8),
                new Date(2025, 4, 1),
            ];

            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "daily",
                value: 4
            });
        });

        it('counts streak even if today is missing but yesterday exists', () => {
            const calculator = new StreakCalculator();

            const now = new Date(2025, 4, 14);
            const dates = [
                new Date(2025, 4, 13),
                new Date(2025, 4, 12),
                new Date(2025, 4, 11),
            ];

            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "daily",
                value: 3
            });
        });

        it("returns none if no streak from today or yesterday", () => {
            const calculator = new StreakCalculator();

            const now = new Date(2025, 4, 14);
            const dates = [
                new Date(2025, 4, 10),
                new Date(2025, 4, 9),
            ];

            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "none",
                value: 0
            });
        });
    });

    describe("weekly streak", () => {

        it ("returns weekly number", () => {
            expect(getISOWeek(new Date(2026, 1, 17))).toBe(8);
            expect(getISOWeek(new Date(2026, 1, 12))).toBe(7);
            expect(getISOWeek(new Date(2026, 1, 10))).toBe(7);
            expect(getISOWeek(new Date(2026, 1, 4))).toBe(6);
            expect(getISOWeek(new Date(2026, 0, 28))).toBe(5);
        })

        it ("returns weekly streak when ISO weeks are consecutive", () => {

            const now = new Date(2026, 1, 12);
            const dates = [
                new Date(2026, 1, 10),
                new Date(2026, 1, 4),
                new Date(2026, 0, 28),
            ];

            const calculator = new StreakCalculator();
            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "weekly",
                value: 3
            });
        });

        it ("returns weekly streak even if current week is missing", () => {

            const now = new Date(2026, 1, 17);
            const dates = [
                new Date(2026, 1, 12),
                new Date(2026, 1, 10),
                new Date(2026, 1, 4),
                new Date(2026, 0, 28),
            ];

            const calculator = new StreakCalculator();
            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "weekly",
                value: 3
            });
        });
    });

    describe("monthly streak", () => {

        it ("returns monthly streak when months are consecutive", () => {

            const now = new Date(2026, 6, 12);
            const dates = [
                new Date(2026, 6, 11),
                new Date(2026, 5, 25),
                new Date(2026, 4, 10),
                new Date(2026, 3, 30),
            ];

            const calculator = new StreakCalculator();
            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "monthly",
                value: 4
            });
        });

        it ("returns monthly streak even when current month is missing", () => {

            const now = new Date(2026, 6, 12);
            const dates = [
                new Date(2026, 5, 25),
                new Date(2026, 4, 10),
                new Date(2026, 3, 30),
            ];

            const calculator = new StreakCalculator();
            const result = calculator.calculate(dates, now);

            expect(result).toEqual({
                type: "monthly",
                value: 3
            });
        });
    });


    it("returns none if no consecutive days", () => {
        const analyzer = new StreakCalculator();

        const now = new Date(2025, 4, 14);

        const dates = [
            new Date(2025, 4, 11),
            new Date(2025, 2, 12),
        ];

        const result = analyzer.calculate(dates, now);
        expect(result).toEqual({
            type: "none",
            value: 0
        })
    });

    describe("process best streak", () => {
        it("should return days streak if it’s the longest", () => {
            const streaks = {
                daily: 10,
                weekly: 2,
                monthly: 1
            }

            const calculator = new StreakCalculator();
            const result = calculator.getBestStreak(streaks.daily, streaks.weekly, streaks.monthly);
            expect(result).toEqual({
                type: "daily",
                value: 10
            });
        });

        it("should return weekly streak if it’s the longest", () => {
            const streak = {
                daily: 2,
                weekly: 12,
                monthly: 4
            };

            const calculator = new StreakCalculator();
            const result = calculator.getBestStreak(streak.daily, streak.weekly, streak.monthly);
            expect(result).toEqual({
                type: "weekly",
                value: 12
            });
        });

        it("should return monthy streak if it’s the longest", () => {
            const streak = {
                daily: 8,
                weekly: 2,
                monthly: 12
            };

            const calculator = new StreakCalculator();
            const result = calculator.getBestStreak(streak.daily, streak.weekly, streak.monthly);
            expect(result).toEqual({
                type: "monthly",
                value: 12
            });
        });

        it ("should return none if no streak", () => {
            const streak = {
                daily: 0,
                weekly: 0,
                monthly: 0
            };

            const calculator = new StreakCalculator();
            const result = calculator.getBestStreak(streak.daily, streak.weekly, streak.monthly);
            expect(result).toEqual({
                type: "none",
                value: 0
            });
        });

        it ("when two streaks are equals, return the smallest unit", () => {
            const streak = {
                daily: 10,
                weekly: 2,
                monthly: 10
            };

            const calculator = new StreakCalculator();
            const result = calculator.getBestStreak(streak.daily, streak.weekly, streak.monthly);
            expect(result).toEqual({
                type: "daily",
                value: 10
            });
        });
    })
})