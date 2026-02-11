import {GetUserDailySummaryResponse} from "@/features/tasks/domain/GetUserDailySummary.ts";
import {createAddDoneTaskAction} from "@/features/tasks/composition.ts";
import {useUserDailySummary} from "@/features/tasks/ui/useUserDailySummary.ts";

interface UserDailySummaryProps {
    action?: {
        execute: () => Promise<GetUserDailySummaryResponse>
    }
}

export default function UserDailySummary({ action }: UserDailySummaryProps) {

    const resolvedAction = action ?? createAddDoneTaskAction();
    const {summary} = useUserDailySummary(resolvedAction);

    if (!summary) return;

    return (
        <div data-testid="user-daily-summary" className="bg-yellow-400 text-black p-4 rounded-lg shadow-lg font-heading text-2xl text-center">
            { summary}
        </div>
    )
};