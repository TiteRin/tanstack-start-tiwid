import {createHomeStore} from "@/features/home/state/home.store.ts";
import {createContext, useRef} from "react";
import {RandomPraiseGenerator} from "@/features/home/lib/praise.generator.ts";
import {useStore} from "zustand/react";
import * as React from "react";

type HomeStoreApi = ReturnType<typeof createHomeStore>;

export const HomeStoreContext = createContext<HomeStoreApi | null>(null);

export function HomeStoreProvider(
    {
        children,
        initialData
    }:
    {
        children: React.ReactNode,
        initialData: {
            praise: string,
            countTotalTasks: number,
            countDoneTasksToday: number
        }
    }) {

    const storeRef = useRef<HomeStoreApi | null>(null);

    if (!storeRef.current) {
        storeRef.current = createHomeStore({
            praiseGenerator: new RandomPraiseGenerator()
        });
        storeRef.current.getState().initializeFromSSR(initialData);
    }

    return <HomeStoreContext.Provider value={storeRef.current}>
        {children}
    </HomeStoreContext.Provider>
}

export function useHomeStore<T>(
    selector: (state: any) => T
) {
    const store = React.useContext(HomeStoreContext);
    if (!store) {
        throw new Error("Missing Home Store");
    }

    return useStore(store, selector);
}