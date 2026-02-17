import { describe, it, expect } from "vitest";
import { getISOWeek, getISOYear } from "@/features/tasks/domain/streak/date.utils.ts";

describe("Date utils", () => {

    it ("returns the ISO year for a date", () => {
        const date = new Date(2023, 2, 18);
        expect(getISOYear(date)).toBe(2023);
    })

    it ("returns the ISO year for new year’s day", () => {
        const date = new Date(2023, 0, 1);
        expect(date.toISOString()).toBe("2022-12-31T23:00:00.000Z");
        expect(getISOYear(date)).toBe(2022);
    });

    it("returns the ISO week for a date", () => {
        const date = new Date(2024, 2, 18);
        expect(getISOWeek(date)).toBe(12);
    });

    it ("returns the ISO week for a new year’s day", () => {
        expect(getISOWeek(new Date(2023, 0, 1))).toBe(52);
        expect(getISOWeek(new Date(2024, 0, 1))).toBe(1);
    });
});