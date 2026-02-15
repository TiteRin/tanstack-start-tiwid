import {createStore} from "zustand/vanilla";

type HomeState = {
    praise: string;
    countDoneTasksToday: number;
    countTotalTasks: number;
    isSubmitting: boolean;

    initializeFromSSR: (data: {
        praise: string,
        countTotalTasks: number,
        countDoneTasksToday: number
    }) => void;
    startOptimisticAddTask: () => void;
    confirmAdd: (payload: { countTotalTasks: number }) => void;
    rollbackAdd: () => void;
};

export function createHomeStore() {
    return createStore<HomeState>((set) => ({
        praise: "",
        countDoneTasksToday: 0,
        countTotalTasks: 0,
        isSubmitting: false,

        initializeFromSSR: (data) => set({
            praise: data.praise,
            countDoneTasksToday: data.countDoneTasksToday,
            countTotalTasks: data.countTotalTasks
        }),
        startOptimisticAddTask: () => set((state) => ({
            praise: "Amazing!",
            countDoneTasksToday: state.countDoneTasksToday + 1,
            isSubmitting: true,
        })),
        confirmAdd: (payload) => set({
            countTotalTasks: payload.countTotalTasks,
            isSubmitting: false,
        }),
        rollbackAdd: () => set((state) => ({
            isSubmitting: false,
            countDoneTasksToday: state.countDoneTasksToday - 1,
        }))
    }))
}