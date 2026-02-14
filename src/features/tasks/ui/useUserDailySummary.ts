import {useEffect, useState} from "react";
import {getUserDailySummaryServer} from "@/features/tasks/server/getUserDailySummary.functions.ts";
import {GetUserDailySummaryResponse} from "@/features/tasks/domain/GetUserDailySummaryUseCase.ts";

type GetUserDailySummaryServer = typeof getUserDailySummaryServer;

export function useUserDailySummary(serverFn: GetUserDailySummaryServer = getUserDailySummaryServer) {

    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
        async function load() {
            const result: GetUserDailySummaryResponse = await serverFn();

            if (result.type === "today") {
                setSummary(`You’ve already done ${result.count} tasks today!`);
            } else if (result.type === "yesterday") {
                setSummary(`You did ${result.count} tasks yesterday!`);

            } else {
                setSummary("");
            }
        }

        load();
    }, [])

    return {summary};
}