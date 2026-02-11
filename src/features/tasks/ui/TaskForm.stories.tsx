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
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        const input = canvas.getByTestId('task-input');
        await userEvent.type(input, 'I ran some errands');
        await userEvent.click(canvas.getByTestId('task-submit'));
        await expect(canvas.getByText(/Congratulations/)).toBeInTheDocument();
    }
};

