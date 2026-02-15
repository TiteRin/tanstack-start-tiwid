import {useRef} from "react";
import {useStore} from "zustand/react";
import {createHomeStore} from "@/features/home/state/home.store.ts";
import {RandomPraiseGenerator} from "@/features/home/lib/praise.generator.ts";

export function useHomeStore(initialData: {
    praise: string,
    countTotalTasks: number,
    countDoneTasksToday: number
}) {
    const storeRef = useRef<ReturnType<typeof createHomeStore> | null>(null);

    if (!storeRef.current) {
        storeRef.current = createHomeStore({
            praiseGenerator: new RandomPraiseGenerator()
        });
        storeRef.current.getState().initializeFromSSR(initialData);
    }

    return useStore(storeRef.current);
}