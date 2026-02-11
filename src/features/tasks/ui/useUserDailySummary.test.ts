import {describe, it, expect} from 'vitest'
import {renderHook, waitFor} from "@testing-library/react";
import {useUserDailySummary} from "@/features/tasks/ui/useUserDailySummary.ts";

describe("useUserDailySummary - HOOK", () => {

    it("when there are done task today, should return today summary", async () => {

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

    it ("else, whene there are done tasks yesterday, should return yesterday summary", async () => {
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

    it ("else, should return nothing", async() => {
        const fakeUseCase = {
            execute: async () => {
                return {
                    type: "none",
                    count: 0
                }
            }
        };

        const {result} = renderHook(() => useUserDailySummary(fakeUseCase as any));
        await waitFor(() => {
            expect(result.current.summary).toBe("");
        });
    })
});