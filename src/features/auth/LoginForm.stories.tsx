import { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
    title: 'Feature/Auth/LoginForm',
    component: LoginForm,
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    args: {
        handleSignIn: (email: string, password: string) => {
            console.log(`Signing in with email: ${email}, password: ${password}`);
        }
    }
}