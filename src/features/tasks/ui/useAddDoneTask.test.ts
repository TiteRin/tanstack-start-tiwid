import {describe, it, expect} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {useAddDoneTask} from "./useAddDoneTask";

describe("useAddDoneTask - HOOK", () => {

    it("should set success message after submit", async () => {
        const {result} = renderHook(() => useAddDoneTask());

        await act(async () => {
            await result.current.submit("I ran some errands");
        });

        expect(result.current.message).toBe("A task has been added!");
    });

    it("should set an error message when label is empty", async () => {
        const {result} = renderHook(() => useAddDoneTask());
        await act(async () => {
            await result.current.submit("");
        });

        expect(result.current.message).toBe("Please enter a task label");

    });
});
