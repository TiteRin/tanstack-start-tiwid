import { describe, it, expect } from 'vitest'
import { computePraiseScale } from './computePraiseScale.ts'

describe("Compute praise scale", () => {
    it("returns 1 for 0 task", () => {
        expect(computePraiseScale(0)).toBe(1);
    });

    it("increases quickly at the beginning", () => {
        const scale1 = computePraiseScale(1);
        const scale5 = computePraiseScale(5);
        expect(scale5).toBeGreaterThan(scale1);
    })

    it("growths slower over time", () => {
        const scale1 = computePraiseScale(1);
        const scale10 = computePraiseScale(10);
        const scale50 = computePraiseScale(50);

        const deltaEarly = scale10 - scale1;
        const deltaLate = scale50 - scale10;

        expect(deltaLate).toBeLessThan(deltaEarly);
    })

    it("never exceeds max scale", () => {
        expect(computePraiseScale(1000)).toBeLessThanOrEqual(2);
    });
});