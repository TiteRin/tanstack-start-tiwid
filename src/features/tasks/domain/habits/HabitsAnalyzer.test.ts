import {describe, it, expect} from "vitest"
import {StreakCalculator} from "./StreakCalculator.ts"

describe("StreakCalculator", () => {
    describe(" - daily streak", () => {

        it("detects consecutive daily streak", () => {
            const calculator = new StreakCalculator();

            const now = new Date(2025, 4, 14);
            const dates = [
                new Date(2025, 4, 14),
                new Date(2025, 4, 13),
                new Date(2025, 4, 12),
                new Date(2025, 4, 11),
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
})