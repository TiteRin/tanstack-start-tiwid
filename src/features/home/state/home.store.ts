import {createStore} from "zustand/vanilla";
import {PraiseGenerator} from "@/features/home/lib/praise.generator.ts";

type HomeStoreDependencies = {
    praiseGenerator: PraiseGenerator
};

type HomeState = {
    praise: string;
    countDoneTasksToday: number;
    countTotalTasks: number;
    isSubmitting: boolean;

    _backup?: {
        praise: string,
        countDoneTasksToday: number,
        countTotalTasks: number
    }

    initializeFromSSR: (data: {
        praise: string,
        countTotalTasks: number,
        countDoneTasksToday: number
    }) => void;
    startOptimisticAddTask: () => void;
    confirmAdd: (payload: { countTotalTasks: number }) => void;
    rollbackAdd: () => void;
};

export function createHomeStore(deps: HomeStoreDependencies) {

    const praiseGenerator = deps?.praiseGenerator ?? {
        generate: () => "Good job!"
    };

    return createStore<HomeState>((set, get) => ({
        praise: "",
        countDoneTasksToday: 0,
        countTotalTasks: 0,
        isSubmitting: false,

        initializeFromSSR: (data) => set({
            praise: data.praise,
            countDoneTasksToday: data.countDoneTasksToday,
            countTotalTasks: data.countTotalTasks
        }),
        startOptimisticAddTask: () => {

            const current = get();

            set({
                _backup: {
                    praise: current.praise,
                    countDoneTasksToday: current.countDoneTasksToday,
                    countTotalTasks: current.countTotalTasks
                },
                praise: praiseGenerator.generate(),
                countDoneTasksToday: current.countDoneTasksToday + 1,
                isSubmitting: true,
            });
        },
        confirmAdd: (payload) => {
            set({
                countTotalTasks: payload.countTotalTasks,
                isSubmitting: false,
            })
        },
        rollbackAdd:
            () => {
                const backup = get()._backup;
                if (!backup) return;
                set({
                    praise: backup.praise,
                    countDoneTasksToday: backup.countDoneTasksToday,
                    countTotalTasks: backup.countTotalTasks,
                    isSubmitting: false,
                    _backup: undefined
                });
            }
    }))
}