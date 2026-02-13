import {useEffect, useState} from "react";
import {getUserDailySummaryServer} from "@/features/tasks/server/getUserDailySummary.functions.ts";
import {GetUserDailySummaryResponse} from "@/features/tasks/domain/GetUserDailySummaryAction.ts";

export function useUserDailySummary() {

    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
        async function load() {
            const result: GetUserDailySummaryResponse = await getUserDailySummaryServer({data: {userId: 1}});

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