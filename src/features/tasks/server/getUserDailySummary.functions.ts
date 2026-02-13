import {createServerFn} from "@tanstack/react-start";
import {getUserDailySummaryImpl} from "@/features/tasks/server/task.server.ts";
import {z} from "zod";

const GetUserDailySummaryInputSchema = z.object({
    userId: z.number()
})

export const getUserDailySummaryServer = createServerFn()
    .inputValidator(GetUserDailySummaryInputSchema)
    .handler(async ({data}) => {
        return getUserDailySummaryImpl(data.userId)
    });