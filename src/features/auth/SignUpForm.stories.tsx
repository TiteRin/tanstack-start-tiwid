import { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "storybook/test";
import SignUpForm from "./SignUpForm";

const meta: Meta<typeof SignUpForm> = {
  title: "Feature/Auth/SignUpForm",
  component: SignUpForm,
  args: {
    handleSignUp: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {};

export const SuccessfulRegistration: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('name-input'), 'Camille Dupont');
    await userEvent.type(canvas.getByTestId('email-input'), 'camille.dupont@example.com');
    await userEvent.type(canvas.getByTestId('password-input'), 'super-secret');

    await userEvent.click(canvas.getByRole('button', { name: /s'inscrire/i }));

    await expect(args.handleSignUp).toHaveBeenCalledWith(
      'Camille Dupont',
      'camille.dupont@example.com',
      'super-secret'
    );
  },
};

export const RegistrationWithError: Story = {
  args: {
    error: "Cet email est déjà utilisé",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Cet email est déjà utilisé")).toBeInTheDocument();
  },
};
