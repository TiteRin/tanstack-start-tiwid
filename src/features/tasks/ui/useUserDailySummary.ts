import {useEffect, useState} from "react";
import {GetUserDailySummaryPort} from "@/features/tasks/domain/GetUserDailySummary.ts";

type Summary = |
    { type: "today", count: number } |
    { type: "yesterday", count: number } |
    { type: "none", count: 0 }

export function useUserDailySummary(useCase: GetUserDailySummaryPort) {

    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
        async function load() {
            const result: Summary = await useCase.execute(1) as Summary;

            if (result.type === "today") {
                setSummary(`You’ve already done ${result.count} tasks today!`);
            } else if (result.type === "yesterday") {
                setSummary(`You did ${result.count} tasks yesterday!`);

            } else {
                setSummary("");
            }
        }

        load();
    }, [useCase])

    return {summary};
}