import {describe, expect, it} from "vitest";
import {createHomeStore} from "./home.store";

describe("Home Store -- STORE", () => {

    it("initializes from SSR data", () => {

        const store = createHomeStore();

        store.getState().initializeFromSSR({
            praise: "Amazing",
            countTotalTasks: 10,
            countDoneTasksToday: 5
        });

        const state = store.getState();
        expect(state.praise).toBe("Amazing");
        expect(state.countTotalTasks).toBe(10);
        expect(state.countDoneTasksToday).toBe(5);
    });

    it("increments counters optimistically", () => {
        const store = createHomeStore();

        store.getState().initializeFromSSR({
            praise: "",
            countTotalTasks: 1,
            countDoneTasksToday: 3
        });

        store.getState().startOptimisticAddTask();

        const state = store.getState();
        expect(state.praise).toBe("Amazing!");
        expect(state.countTotalTasks).toBe(1);
        expect(state.countDoneTasksToday).toBe(4);
    });
});