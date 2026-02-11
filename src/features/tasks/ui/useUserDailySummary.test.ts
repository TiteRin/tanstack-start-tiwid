import {describe, it, expect} from 'vitest'
import {renderHook, waitFor} from "@testing-library/react";
import {useUserDailySummary} from "@/features/tasks/ui/useUserDailySummary.ts";

describe("useUserDailySummary - HOOK", () => {

    it("returns today summary", async () => {

        const fakeUseCase = {
            execute: async () => {
                return {
                    type: "today",
                    count: 3
                }
            }
        };

        const {result} = renderHook(() => useUserDailySummary(fakeUseCase as any));
        await waitFor(() => {
            expect(result.current.summary).toBe("You’ve already done 3 tasks today!");
        });
    });

    it ("returns yesterday summary", async () => {
        const fakeUseCase = {
            execute: async () => {
                return {
                    type: "yesterday",
                    count: 5
                }
            }
        };

        const {result} = renderHook(() => useUserDailySummary(fakeUseCase as any));
        await waitFor(() => {
            expect(result.current.summary).toBe("You did 5 tasks yesterday!");
        });
    });
});