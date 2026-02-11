import {useState} from "react";
import {Label} from "@/components/ui/Label.tsx";
import {Input} from "@/components/ui/Input.tsx";
import {Button} from "@/components/ui/Button.tsx";
import clsx from "clsx";
import {useAddDoneTask} from "@/features/tasks/ui/useAddDoneTask.ts";
import {createAddDoneTaskAction} from "@/features/tasks/composition.ts";
import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTask.ts";

type TaskFormProps = {
    action?: AddDoneTaskAction
}

export default function TaskForm({action}: TaskFormProps) {

    const [task, setTask] = useState<string>("");
    const resolvedAction = action ?? createAddDoneTaskAction();
    const {submit, message, status} = useAddDoneTask(resolvedAction);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submit(task);
            setTask("");
        }}>
            <fieldset className={clsx('p-4 mb-2')}>
                <Label aria-placeholder="e.g. I ran some errands ">My achievement</Label>
                <Input value={task}
                       onChange={(e) => setTask(e.target.value)}
                       data-testid="task-input"
                />
            </fieldset>

            <Button type="submit" className={clsx("w-full")} data-testid="task-submit"
                    disabled={status === "submitting"}>
                {status === "success" && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6 inline-block align-bottom">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                    </svg>
                )}
                {
                    status === "error" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6 inline-block align-bottom">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                        </svg>
                    )
                }
                {
                    status === "submitting" && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6 inline-block align-bottom">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                        </svg>
                    )
                }
                I did it!
            </Button>

            {message && <p>{message}</p>}
            {status === "error" && <p className="text-red-500">Something went wrong…</p>}
        </form>
    )
}