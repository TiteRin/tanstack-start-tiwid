import {describe, it, expect, vi} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {useAddDoneTask} from "./useAddDoneTask";
import {createAddDoneTaskAction} from "@/features/tasks/composition.ts";

describe("useAddDoneTask - HOOK", () => {

    it("should set success message after submit", async () => {
        const action = createAddDoneTaskAction();
        const {result} = renderHook(() => useAddDoneTask(action));

        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(result.current.status).toBe("success");
    });

    it("should set an error message when label is empty", async () => {
        const action = createAddDoneTaskAction()
        const {result} = renderHook(() => useAddDoneTask(action));
        await act(async () => {
            await result.current.submit("");
        });

        expect(result.current.status).toBe("error");
    });

    it("calls injected action", async () => {

        const executeMock = vi.fn();
        const fakeAction = {
            execute: executeMock
        }

        const {result} = renderHook(() => useAddDoneTask(fakeAction as any));
        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(executeMock).toHaveBeenCalledWith("I ran some errands", 1);
    });
});
