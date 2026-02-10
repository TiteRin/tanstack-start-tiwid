import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Sign in",
        variant: "primary"
    }
}

export const Ghost: Story = {
    args: {
        children: "Create account",
        variant: "ghost"
    }
}