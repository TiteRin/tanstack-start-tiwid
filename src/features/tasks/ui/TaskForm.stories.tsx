import {Meta, StoryObj} from "@storybook/react";
import TaskForm from "./TaskForm";
import {expect, userEvent, within} from "storybook/test";

const meta: Meta<typeof TaskForm> = {
    title: 'Feature/Tasks/TaskForm',
    component: TaskForm,
};

export default meta;
type Story = StoryObj<typeof TaskForm>;

export const HappyPath: Story = {
    render: () => {
        // @ts-ignore
        return <TaskForm addDoneTask={async (label, userId) => {
            await new Promise((resolve) => setTimeout(resolve, 650));
            return {
                message: "A task has been added!",
                task: {
                    id: 1,
                    label,
                    userId
                },
                doneTask: {
                    id: 1,
                    userId,
                    taskId: 1,
                    doneAt: new Date().toISOString()
                }
            }
        }}/>
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        const input = canvas.getByTestId('task-input');
        const submitButton = canvas.getByTestId('task-submit');
        await userEvent.type(input, 'I ran some errands');
        await userEvent.click(submitButton);
        await expect(submitButton).toBeDisabled();
        await expect(input).toHaveValue("");
        await expect(canvas.getByTestId('submitting-icon')).toBeInTheDocument();
        await new Promise((resolve) => setTimeout(resolve, 700));
        await expect(submitButton).not.toBeDisabled();
        await expect(canvas.getByText(/A task has been added!/)).toBeInTheDocument();
        await expect(canvas.getByTestId('success-icon')).toBeInTheDocument();
    }
};

export const Error: Story = {
    render: () => {
        // @ts-ignore
        return <TaskForm addDoneTask={async (label, userId) => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            throw "The label is required";
        }}/>
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        const submitButton = canvas.getByTestId('task-submit');

        await userEvent.click(submitButton);
        await new Promise((resolve) => setTimeout(resolve, 350));

        await expect(canvas.getByText(/Something went wrong…/)).toBeInTheDocument();
        await expect(canvas.getByTestId('error-icon')).toBeInTheDocument();
    }
}