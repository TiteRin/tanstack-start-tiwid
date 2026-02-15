import type {Meta, StoryObj} from '@storybook/react';
import TaskCard from './TaskCard';

const meta: Meta = {
    title: 'Feature/Tasks/TaskCard',
    component: TaskCard,
}

export default meta;

const today = new Date();
const yesterday = new Date(today.setDate(today.getDate() - 1));

export const Default: StoryObj = {
    args: {
        label: "I did the dishes!",
        onClick: () => console.log("Task clicked!"),
        totalDone: 10,
        currentStreak: 3,
        lastDone: yesterday,
    }
}

export const Favorite: StoryObj = {
    args: {
        ...Default.args,
        isFavorite: true,
    }
};

export const NoStreak: StoryObj = {
    args: {
        ...Default.args,
        currentStreak: 0,
    }
};