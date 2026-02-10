import {Meta, StoryObj} from "@storybook/react";
import {Button} from "./Button";
import {expect, fn, userEvent, within} from "storybook/test";

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Sign in",
        variant: "primary",
        onClick: fn()
    },
    play: async ({canvasElement, args}) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await expect(button).toBeVisible();

        await expect(button.className).toContain('bg-yellow-400');
        await expect(button.className).toContain('text-black');
        await userEvent.click(button);

        await expect(args.onClick).toHaveBeenCalledTimes(1);
    }
}

export const Ghost: Story = {
    args: {
        children: "Create account",
        variant: "ghost",
        onClick: fn()
    },
    play: async ({canvasElement, args}) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await expect(button).toBeVisible();
        await expect(button.className).toContain('border-yellow-400');
        await expect(button.className).toContain('text-yellow-400');
        await userEvent.click(button);

        await expect(args.onClick).toHaveBeenCalledTimes(1);
    }
}

export const Disabled: Story = {
    args: {
        children: "Sign in",
        variant: "primary",
        disabled: true,
        onClick: fn()
    },
    play: async ({canvasElement, args}) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await expect(button).toBeDisabled();
        await expect(button.className).toContain('disabled:opacity-50');
        await expect(button.className).toContain('disabled:cursor-not-allowed');
        await userEvent.click(button);
        await expect(args.onClick).toHaveBeenCalledTimes(0);
    }
}