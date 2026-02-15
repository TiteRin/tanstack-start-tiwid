import {describe, it, expect, vi} from "vitest";
import {GetHomePageDataUseCase} from "./GetHomePageDataUseCase.ts";

describe("GetHomePageDataUseCase", () => {
    it("should return home page data for a given user", async () => {
        const userId = "user-123";
        const mockUser = { id: userId, name: "John Doe" };
        const totalTasks = 10;
        const doneTasksToday = 3;

        const repository = {
            getUserById: vi.fn().mockResolvedValue(mockUser),
            countTotalTasks: vi.fn().mockResolvedValue(totalTasks),
            countDoneTasksToday: vi.fn().mockResolvedValue(doneTasksToday),
        };

        const useCase = new GetHomePageDataUseCase(repository);
        const result = await useCase.execute({ userId });

        expect(repository.getUserById).toHaveBeenCalledWith(userId);
        expect(repository.countTotalTasks).toHaveBeenCalledWith(userId);
        expect(repository.countDoneTasksToday).toHaveBeenCalledWith(userId);

        expect(result).toEqual({
            user: mockUser,
            countTotalTasks: totalTasks,
            countDoneTasksToday: doneTasksToday,
        });
    });

    it("should handle parallel repository calls", async () => {
        const userId = "user-123";
        const repository = {
            getUserById: vi.fn().mockReturnValue(new Promise(resolve => setTimeout(() => resolve({ id: userId, name: "John Doe" }), 10))),
            countTotalTasks: vi.fn().mockReturnValue(new Promise(resolve => setTimeout(() => resolve(10), 5))),
            countDoneTasksToday: vi.fn().mockReturnValue(new Promise(resolve => setTimeout(() => resolve(3), 1))),
        };

        const useCase = new GetHomePageDataUseCase(repository);
        const result = await useCase.execute({ userId });

        expect(result).toEqual({
            user: { id: userId, name: "John Doe" },
            countTotalTasks: 10,
            countDoneTasksToday: 3,
        });
    });
});
