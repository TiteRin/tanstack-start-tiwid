import {describe, expect, it} from "vitest";
import {createHomeStore} from "./home.store";
import {RandomPraiseGenerator} from "@/features/home/lib/praise.generator.ts";

describe("Home Store -- STORE", () => {

    it("initializes from SSR data", () => {

        const store = createHomeStore({
            praiseGenerator: new RandomPraiseGenerator()
        });

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
        const store = createHomeStore({
            praiseGenerator: new RandomPraiseGenerator()
        });

        store.getState().initializeFromSSR({
            praise: "",
            countTotalTasks: 1,
            countDoneTasksToday: 3
        });

        store.getState().startOptimisticAddTask();

        const state = store.getState();
        expect(state.praise).not.toBe("");
        expect(state.countTotalTasks).toBe(1);
        expect(state.countDoneTasksToday).toBe(4);
    });

    it("generates a new praise message", () => {
        const store = createHomeStore({
            praiseGenerator: {
                generate: () => "Great job!"
            }
        });

        store.getState().initializeFromSSR({
            praise: "",
            countTotalTasks: 1,
            countDoneTasksToday: 3
        });
        store.getState().startOptimisticAddTask();

        const state = store.getState();
        expect(state.praise).toBe("Great job!");
    });

    it("rolls back optimistic changes if an error occurs", () => {
        const store = createHomeStore({
            praiseGenerator: {
                generate: () => "Amazing!"
            }
        });

        store.getState().initializeFromSSR({
            praise: "",
            countTotalTasks: 1,
            countDoneTasksToday: 3
        });
        store.getState().startOptimisticAddTask();
        store.getState().rollbackAdd();

        const state = store.getState();
        expect(state.praise).toBe("");
        expect(state.countDoneTasksToday).toBe(3);
        expect(state.countTotalTasks).toBe(1);
    });

    it("confirms server count on success", () => {
        const store = createHomeStore({
            praiseGenerator: {
                generate: () => "Amazing!"
            }
        });

        store.getState().initializeFromSSR({
            praise: "",
            countTotalTasks: 1,
            countDoneTasksToday: 3
        });
        store.getState().startOptimisticAddTask();
        store.getState().confirmAdd({countTotalTasks: 2});

        const state = store.getState();
        expect(state.praise).toBe("Amazing!");
        expect(state.countDoneTasksToday).toBe(4);
        expect(state.countTotalTasks).toBe(2);
    });
});