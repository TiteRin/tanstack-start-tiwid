import {useState} from "react";
import {Label} from "@/components/ui/Label.tsx";
import {Input} from "@/components/ui/Input.tsx";
import {Button} from "@/components/ui/Button.tsx";
import clsx from "clsx";

export default function TaskForm() {

    const [task, setTask] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
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