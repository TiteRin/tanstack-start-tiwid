import {describe, it, expect, vi, beforeEach} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {useAddDoneTask} from "./useAddDoneTask";
import {addDoneTaskServer} from "@/features/tasks/server/addDoneTask.functions";
import {createHomeStore} from "@/features/home/state/home.store.ts";
import {RandomPraiseGenerator} from "@/features/home/lib/praise.generator.ts";
import {HomeStoreProvider} from "@/features/home/state/home-store-provider";

vi.mock(
    "@/features/tasks/server/addDoneTask.functions.ts",
    () => ({
        addDoneTaskServer: vi.fn()
    })
);

let store: ReturnType<typeof createHomeStore>;

const wrapper = ({children}: { children: React.ReactNode }) => (
    <HomeStoreProvider store={store} initialData={{
        praise: "You did it!",
        countTotalTasks: 10,
        countDoneTasksToday: 5
    }}>{children}</HomeStoreProvider>
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
        const {result} = renderHook(() => useAddDoneTask(), {wrapper});

        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(result.current.status).toBe("success");
    });

    it("should set an error message when label is empty", async () => {

        (addDoneTaskServer as any).mockRejectedValue(
            new Error("Invalid input")
        );

        const {result} = renderHook(() => useAddDoneTask(), {wrapper});
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

        const {result} = renderHook(() => useAddDoneTask(), {wrapper});
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

describe("useAddDoneTask - Optimistic flow", () => {

    beforeEach(() => {

        store = createHomeStore({
            praiseGenerator: new RandomPraiseGenerator()
        })

        vi.spyOn(store.getState(), "startOptimisticAddTask");
        vi.spyOn(store.getState(), "confirmAdd");
        vi.spyOn(store.getState(), "rollbackAdd");

        vi.resetAllMocks();
    });

    it("calls optimistic add when submit is called", async () => {
        ;(addDoneTaskServer as any).mockResolvedValue({
            dailyDoneCount: 2,
            message: "Amazing!"
        });

        const {result} = renderHook(() => useAddDoneTask(), {wrapper});
        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(store.getState().startOptimisticAddTask).toHaveBeenCalled();
        expect(store.getState().confirmAdd).toHaveBeenCalled();
    });

    it("calls rollback when add fails", async () => {
        ;(addDoneTaskServer as any).mockRejectedValue(new Error("Invalid input"));

        const {result} = renderHook(() => useAddDoneTask(), {wrapper});
        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(store.getState().startOptimisticAddTask).toHaveBeenCalled();
        expect(store.getState().confirmAdd).not.toHaveBeenCalled();
        expect(store.getState().rollbackAdd).toHaveBeenCalled();
    })
})
