export class GetUserDailySummary {

    constructor(private repository: any, private clock: any) {
    }

    async execute(userId: number) {
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