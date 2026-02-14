import {createServerFn} from "@tanstack/react-start";
import {getUserDailySummaryImpl} from "@/features/tasks/server/task.server.ts";
import {getRequest} from "@tanstack/react-start/server";
import {requireUser} from "@/server/requireUser.ts";

export const getUserDailySummaryServer = createServerFn()
    .handler(async ({}) => {

        const request = getRequest();
        const userId = await requireUser(request.headers);

        return getUserDailySummaryImpl(userId)
    });