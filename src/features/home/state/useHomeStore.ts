import {createHomeStore} from "@/features/home/state/home.store.ts";
import {useRef} from "react";
import {useStore} from "zustand/react";

export function useHomeStore(initialData: {
    praise: string,
    countTotalTasks: number,
    countDoneTasksToday: number
}) {
    const storeRef = useRef<ReturnType<typeof createHomeStore>>();

    if (!storeRef.current) {
        storeRef.current = createHomeStore();
        storeRef.current.getState().initializeFromSSR(initialData);
    }

    return useStore(storeRef.current);
}