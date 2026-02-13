import {describe, it, expect, beforeEach} from 'vitest'
import {renderHook, waitFor} from "@testing-library/react";
import {useUserDailySummary} from "@/features/tasks/ui/useUserDailySummary.ts";
import { vi } from "vitest";
import { getUserDailySummaryServer } from "@/features/tasks/server/getUserDailySummary.functions";


vi.mock(
    "@/features/tasks/server/getUserDailySummary.functions.ts",
    () => ({
        getUserDailySummaryServer: vi.fn()
    })
);

describe("useUserDailySummary - HOOK", () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("when there are done task today, should return today summary", async () => {

        (getUserDailySummaryServer as any).mockResolvedValue({
            type: "today",
            count: 3
        });


        const {result} = renderHook(() => useUserDailySummary());
        await waitFor(() => {
            expect(result.current.summary).toBe("You’ve already done 3 tasks today!");
        });
    });

    it ("else, whene there are done tasks yesterday, should return yesterday summary", async () => {

        (getUserDailySummaryServer as any).mockResolvedValue({
            type: "yesterday",
            count: 5
        });

        const {result} = renderHook(() => useUserDailySummary());
        await waitFor(() => {
            expect(result.current.summary).toBe("You did 5 tasks yesterday!");
        });
    });

    it ("else, should return nothing", async() => {
        (getUserDailySummaryServer as any).mockResolvedValue({
            type: "none",
            count: 0
        });

        const {result} = renderHook(() => useUserDailySummary());
        await waitFor(() => {
            expect(result.current.summary).toBe("");
        });
    })
});