import {describe, it, expect, vi, beforeEach} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {useAddDoneTask} from "./useAddDoneTask";
import {addDoneTaskServer} from "@/features/tasks/server/addDoneTask.functions";
import {TestHomeStoreProvider} from "@/features/home/state/home-store.test-utils.tsx";

vi.mock(
    "@/features/tasks/server/addDoneTask.functions.ts",
    () => ({
        addDoneTaskServer: vi.fn()
    })
);

const startOptimisticAddTask = vi.fn();
const confirmAdd = vi.fn();
const rollbackAdd = vi.fn();

vi.mock(
    "@/features/home/state/useHomeStore.ts",
    () => ({
        useHomeStore: () => ({
            startOptimisticAddTask,
            confirmAdd,
            rollbackAdd
        })
    })
);

const wrapper = ({children}: { children: React.ReactNode }) => (
    <TestHomeStoreProvider>{children}</TestHomeStoreProvider>
);


describe("useAddDoneTask - HOOK", () => {

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it("should set success message after submit", async () => {

        (addDoneTaskServer as any).mockResolvedValue({
            message: "Amazing!",
            task: {
                id: 1,
                label: "I ran some errands",
                userId: 1
            },
            doneTask: {
                id: 2,
                userId: 1,
                taskId: 1,
            }
        });
        const {result} = renderHook(() => useAddDoneTask(), { wrapper });

        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(result.current.status).toBe("success");
    });

    it("should set an error message when label is empty", async () => {

        (addDoneTaskServer as any).mockRejectedValue(
            new Error("Invalid input")
        );

        const {result} = renderHook(() => useAddDoneTask(), { wrapper });
        await act(async () => {
            await result.current.submit("");
        });

        expect(result.current.status).toBe("error");
    });

    it("calls injected action", async () => {

        (addDoneTaskServer as any).mockResolvedValue({
            message: "Amazing!",
            task: {
                id: 1,
                label: "I ran some errands",
                userId: 1
            },
            doneTask: {
                id: 2,
                userId: 1,
                taskId: 1,
            }
        });

        const {result} = renderHook(() => useAddDoneTask(), { wrapper });
        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(addDoneTaskServer).toHaveBeenCalledWith({
            data: {
                label: "I ran some errands",
            }
        });
    });
});
//
// describe("useAddDoneTask - Optimistic flow", () => {
//     beforeEach(() => {
//         vi.resetAllMocks();
//     });
//
//     it("calls optimistic add when submit is called", async () => {
//         ;(addDoneTaskServer as any).mockResolvedValue({
//             dailyDoneCount: 2,
//             message: "Amazing!"
//         });
//
//         const {result} = renderHook(() => useAddDoneTask(), { wrapper });
//         await act(async () => {
//             await result.current.submit("I ran some errands");
//         });
//
//         expect(startOptimisticAddTask).toHaveBeenCalled();
//         expect(confirmAdd).toHaveBeenCalled();
//     });
//
//     it("calls rollback when add fails", async () => {
//         ;(addDoneTaskServer as any).mockRejectedValue(new Error("Invalid input"));
//
//         const {result} = renderHook(() => useAddDoneTask(), { wrapper });
//         await act(async () => {
//             await result.current.submit("I ran some errands");
//         });
//
//         expect(startOptimisticAddTask).toHaveBeenCalled();
//         expect(confirmAdd).not.toHaveBeenCalled();
//         expect(rollbackAdd).toHaveBeenCalled();
//     })
// })
