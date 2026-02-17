import { describe, it, expect } from "vitest";
import { GetUserTaskOverviewUseCase } from "./GetUserTaskOverviewUseCase";

describe("GetUserTaskOverviewUseCase", () => {
    it ("prioritizes favorites", async () => {

        const repository = {
            findTaskOverviewByUser: async (_userId: string) => [
                { id: 1, label: "Task 1", isFavorite: false },
                { id: 2, label: "Task 2", isFavorite: true },
            ]
        };

        const useCase = new GetUserTaskOverviewUseCase(repository as any);
        const result = await useCase.execute({userId: "user123"});
        expect(result).toEqual([
            { id: 2, label: "Task 2", isFavorite: true },
            { id: 1, label: "Task 1", isFavorite: false },
        ]);
    });

    it("limits to 6 tasks", async () => {
        const repository = {
            findTaskOverviewByUser: async (_userId: string) =>
                Array.from({length: 10}, (_, i) => ({ id: i, label: `Task ${i}` }))
        };
        const useCase = new GetUserTaskOverviewUseCase(repository as any);
        const result = await useCase.execute({ userId: "user123" });
        expect(result).toHaveLength(6);
    });

    it("sorts by last done at", async () => {
        const repository = {
            findTaskOverviewByUser: async (_userId: string) => [
                { id: 1, label: "Task 1", isFavorite: false, stats: { lastDoneAt: new Date(2022, 1, 1) } },
                { id: 2, label: "Task 2", isFavorite: false, stats: { lastDoneAt: new Date(2022, 1, 2) } },
            ]
        }

        const useCase = new GetUserTaskOverviewUseCase(repository as any);
        const result = await useCase.execute({ userId: "user123"});

        expect(result).toEqual([
            { id: 2, label: "Task 2", isFavorite: false, stats: { lastDoneAt: new Date(2022, 1, 2) } },
            { id: 1, label: "Task 1", isFavorite: false, stats: { lastDoneAt: new Date(2022, 1, 1) } },
        ]);
    });
});