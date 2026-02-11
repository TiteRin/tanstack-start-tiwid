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

export default function TaskForm({ action }: TaskFormProps) {

    const [task, setTask] = useState<string>("");
    const resolvedAction = action ?? createAddDoneTaskAction();
    const {submit, message} = useAddDoneTask(resolvedAction);

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

            <Button type="submit" className={clsx("w-full")} data-testid="task-submit">
                I did it!
            </Button>

            {message && <p>{message}</p>}
        </form>
    )
}