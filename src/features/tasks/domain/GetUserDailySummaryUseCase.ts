import {UseCase} from "@/features/tasks/domain/UseCase.ts";

type GetUserDailySummaryType = "today" | "yesterday" | "none";
type GetUserDailySummaryResponse = { type: GetUserDailySummaryType, count: number };
type GetUserDailySummaryRepository = { countDoneTasksByDate: (userId: number, date: Date) => Promise<number> };
type GetUserDailySummaryClock = { now: () => Date };

export type GetUserDailySummaryInput = {
    userId: number
};

export class GetUserDailySummaryUseCase implements UseCase<GetUserDailySummaryInput, GetUserDailySummaryResponse> {

    constructor(private repository: GetUserDailySummaryRepository, private clock: GetUserDailySummaryClock) {
    }

    async execute({userId}: GetUserDailySummaryInput): Promise<GetUserDailySummaryResponse> {
        const today = this.clock.now();
        let count = await this.repository.countDoneTasksByDate(userId, today);

        if (count > 0) {
            return {
                type: "today",
                count
            }
        }
        let yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        count = await this.repository.countDoneTasksByDate(userId, yesterday);

        if (count > 0) {
            return {
                type: "yesterday",
                count
            };
        }

        return {
            type: "none",
            count: 0
        };
    }
}

export type {GetUserDailySummaryResponse, GetUserDailySummaryRepository}