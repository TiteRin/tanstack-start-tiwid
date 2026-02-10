import {Meta, StoryObj} from "@storybook/react";
import {expect, fn, userEvent, within} from "storybook/test";
import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
    title: 'Feature/Auth/LoginForm',
    component: LoginForm,
    args: {
        handleSignIn: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const SuccessfulLogin: Story = {
    play: async ({canvasElement, args}) => {
        const canvas = within(canvasElement);

        await userEvent.type(canvas.getByTestId('email-input'), 'test@example.com');
        await userEvent.type(canvas.getByTestId('password-input'), 'password123');

        await userEvent.click(canvas.getByRole('button', {name: /sign in/i}));

        await expect(args.handleSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    },
};

export const LoginWithError: Story = {
    args: {
        error: "Invalid credentials",
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText("Invalid credentials")).toBeInTheDocument();
    }
};