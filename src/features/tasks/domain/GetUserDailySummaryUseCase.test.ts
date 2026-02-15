import {describe, it, expect} from "vitest";
import {GetUserDailySummaryUseCase} from "./GetUserDailySummaryUseCase.ts";
import {TaskRepository} from "@/features/tasks/domain/ports/TaskRepository.ts";

describe("GetUserDailySummary", () => {

    it("returns today’s count when greater than zero", async () => {

        const fakeRepository = {
            countDoneTasksByDate: async () => 3
        } as unknown as TaskRepository;

        const fakeClock = {
            now: () => new Date(2025, 2, 10)
        }

        const useCase = new GetUserDailySummaryUseCase(fakeRepository, fakeClock);
        const result = await useCase.execute({userId: "1"});

        expect(result).toEqual({
            type: "today",
            count: 3
        })
    });

    it("returns yesterday's count when zero today", async () => {

        const fakeNow = new Date(2025, 2, 10);
        const fakeRepo = {
            countDoneTasksByDate: async (_: any, date: Date) => {
                if (date.getTime() === fakeNow.getTime()) return 0;
                return 5;
            }
        }
        const fakeClock = {
            now: () => fakeNow
        }
        const useCase = new GetUserDailySummaryUseCase(fakeRepo as any, fakeClock);
        const result = await useCase.execute({userId: "1"});

        expect(result).toEqual({
            type: "yesterday",
            count: 5
        });
    });

    it("returns 'none' if no tasks today or the day before", async () => {

        const fakeNow = new Date(2025, 2, 10);
        const fakeRepo = {
            countDoneTasksByDate: async () => {
                return 0
            }
        }
        const fakeClock = {
            now: () => fakeNow
        }
        const useCase = new GetUserDailySummaryUseCase(fakeRepo as any, fakeClock);
        const result = await useCase.execute({userId: "1"});

        expect(result).toEqual({
            type: "none",
            count: 0
        });
    });
});