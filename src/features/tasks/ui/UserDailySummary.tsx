import {useUserDailySummary} from "@/features/tasks/ui/useUserDailySummary.ts";

export default function UserDailySummary() {

    const {summary} = useUserDailySummary();

    if (!summary) return;

    return (
        <div data-testid="user-daily-summary"
             className="bg-yellow-400 text-black p-4 rounded-lg shadow-lg font-heading text-2xl text-center">
            {summary}
        </div>
    )
};