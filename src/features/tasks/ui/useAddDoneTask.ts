import {useState} from "react";
import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTask.ts";

const feedback = "A task has been added!"

export function useAddDoneTask(
    action: AddDoneTaskAction
) {
    const [message, setMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function submit(task: string) {

        setIsSubmitting(true);

        try {
            const result = await action.execute(task, 1);
            setMessage(result.message ?? feedback);
        } catch (e) {
            console.error(e);
            setMessage("Please enter a task label");
        } finally {
            setIsSubmitting(false);
        }
    }

    return {submit, message, isSubmitting};
}