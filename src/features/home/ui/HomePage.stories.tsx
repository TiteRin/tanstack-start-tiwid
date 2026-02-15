import type { Meta, StoryObj } from "@storybook/react";
import HomePage from "./HomePage";

const meta: Meta<typeof HomePage> = {
    title: "Pages/HomePage",
    component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const LoggedIn: Story = {
    args: {
        user: { id: "user-1", name: "Alice" },
        praise: "Amazing!",
        countDoneTasksToday: 3,
        countTotalTasks: 12,
    },
};
