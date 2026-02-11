import {Meta, StoryObj} from "@storybook/react";
import UserDailySummary from "./UserDailySummary";
import {expect, within} from "storybook/test";
import {GetUserDailySummaryResponse} from "@/features/tasks/domain/GetUserDailySummary.ts";

const meta: Meta = {
    title: 'Feature/Tasks/UserDailySummary',
    component: UserDailySummary,
};

export default meta;
type Story = StoryObj<typeof UserDailySummary>;

export const Today: Story = {
    render: () => {
        const fakeUseCase = {
            execute: async (): Promise<GetUserDailySummaryResponse> => ({
                type: "today",
                count: 3
            })
        }

        return <UserDailySummary action={fakeUseCase}/>;
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText(/You’ve already done 3 tasks today!/)).toBeInTheDocument();
    }
};

export const Yesterday: Story = {
    render: () => {
        const fakeUseCase = {
            execute: async (): Promise<GetUserDailySummaryResponse> => ({
                type: "yesterday",
                count: 5
            })
        }

        return <UserDailySummary action={fakeUseCase}/>;
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText(/You did 5 tasks yesterday!/)).toBeInTheDocument();
    }
};

export const None: Story = {
    render: () => {
        const fakeUseCase = {
            execute: async (): Promise<GetUserDailySummaryResponse> => ({
                type: "none",
                count: 0
            })
        }

        return <UserDailySummary action={fakeUseCase}/>;
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);

        await expect(canvas.queryByText(/You’ve already done 3 tasks today!/)).not.toBeInTheDocument();
    }
};