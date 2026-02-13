import {describe, it, expect, vi, beforeEach} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {useAddDoneTask} from "./useAddDoneTask";
import {addDoneTaskServer} from "@/features/tasks/server/addDoneTask.functions";

vi.mock(
    "@/features/tasks/server/addDoneTask.functions.ts",
    () => ({
        addDoneTaskServer: vi.fn()
    })
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
        const {result} = renderHook(() => useAddDoneTask());

        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(result.current.status).toBe("success");
    });

    it("should set an error message when label is empty", async () => {

        (addDoneTaskServer as any).mockRejectedValue(
            new Error("Invalid input")
        );

        const {result} = renderHook(() => useAddDoneTask());
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

        const {result} = renderHook(() => useAddDoneTask());
        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(addDoneTaskServer).toHaveBeenCalledWith({
            data: {
                label: "I ran some errands",
                userId: 1
            }
        });
    });
});
