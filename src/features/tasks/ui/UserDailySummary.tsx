import {GetUserDailySummaryResponse} from "@/features/tasks/domain/GetUserDailySummaryAction.ts";
import {useUserDailySummary} from "@/features/tasks/ui/useUserDailySummary.ts";
import {createGetUserDailySummary} from "@/features/tasks/composition.ts";

interface UserDailySummaryProps {
    action?: {
        execute: () => Promise<GetUserDailySummaryResponse>
    }
}

export default function UserDailySummary({action}: UserDailySummaryProps) {

    const resolvedAction = action ?? createGetUserDailySummary();
    const {summary} = useUserDailySummary(resolvedAction);

    if (!summary) return;

    return (
        <div data-testid="user-daily-summary"
             className="bg-yellow-400 text-black p-4 rounded-lg shadow-lg font-heading text-2xl text-center">
            {summary}
        </div>
    )
};