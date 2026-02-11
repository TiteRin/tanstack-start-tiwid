import {Meta, StoryObj} from "@storybook/react";
import TaskForm from "./TaskForm";
import {expect, userEvent, within} from "storybook/test";
import {AddDoneTaskAction} from "@/features/tasks/domain/AddDoneTask.ts";

const meta: Meta<typeof TaskForm> = {
    title: 'Feature/Tasks/TaskForm',
    component: TaskForm,
};

export default meta;
type Story = StoryObj<typeof TaskForm>;

export const HappyPath: Story = {
    render: () => {
        const fakeAction = {
            execute: () => ({
                task: {id: "1", label: "I ran some errands", userId: 1},
                doneTask: {
                    id: "2",
                    userId: 1,
                    taskId: "1",
                    doneAt: new Date()
                },
                message: "A task has been added!"
            })
        } as unknown as AddDoneTaskAction;

        return <TaskForm action={fakeAction}/>;
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        const input = canvas.getByTestId('task-input');
        await userEvent.type(input, 'I ran some errands');
        await userEvent.click(canvas.getByTestId('task-submit'));
        await expect(canvas.getByText(/A task has been added!/)).toBeInTheDocument();
    }
};

