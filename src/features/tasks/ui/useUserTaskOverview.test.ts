import {describe, it, expect, vi, beforeEach} from 'vitest'
import {useUserTaskOverview} from './useUserTaskOverview.ts'
import {renderHook, waitFor} from "@testing-library/react";
import {getUserTaskOverviewServer} from "@/features/home/server/getUserTaskOverview.functions.ts";

vi.mock("@/features/home/server/getUserTaskOverview.functions.ts", () => ({
    getUserTaskOverviewServer: vi.fn()
}));

describe("useUserTaskOverview - HOOK", () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should return correct task overview", async () => {

        (getUserTaskOverviewServer as any).mockResolvedValue([
            {
                id: "1",
                label: "I drank water",
                stats: {
                    totalDone: 42,
                    currentStreak: 3,
                    lastDoneAt: new Date(),
                },
                isFavorite: false
            }
        ])

        const {result} = renderHook(() => useUserTaskOverview());
        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.tasks.length).toBe(1);
        expect(getUserTaskOverviewServer).toHaveBeenCalledWith({data: {userId: "1"}});
    });
})