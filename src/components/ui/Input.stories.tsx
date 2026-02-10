import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
    title: 'UI/Input',
    component: Input,
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: "Your e-mail address"
    }
}

export const Password: Story = {
    args: {
        type: "password",
        value: "***********"
    }
}