import type {Meta, StoryObj} from '@storybook/react';
import {faker} from "@faker-js/faker"
import TaskQuickList, {TaskOverview} from './TaskQuickList';

const meta: Meta = {
    title: 'Feature/Tasks/TaskQuickList',
    component: TaskQuickList,
}

export default meta;
type Story = StoryObj<typeof TaskQuickList>;

const today = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

const mockTasks: TaskOverview[] = [
    {
        id: "1",
        label: "I drank water",
        stats: {
            totalDone: 42,
            currentStreak: 3,
            lastDoneAt: today,
        },
        isFavorite: false
    },
    {
        id: "3",
        label: "I tidied my room!",
        stats: {
            totalDone: 5,
            currentStreak: 0,
            lastDoneAt: faker.date.past()
        },
        isFavorite: false,
    },
    {
        id: "4",
        label: "I did the dishes!",
        stats: {
            totalDone: 10,
            currentStreak: 5,
            lastDoneAt: yesterday
        },
        isFavorite: true,
    },
    {
        id: "5",
        label: "I put clean clothes on!",
        stats: {
            totalDone: 10,
            currentStreak: 10,
            lastDoneAt: today,
        },
        isFavorite: false,
    },
    {
        id: "6",
        label: "I fed the cats!",
        isFavorite: true,
        stats: {
            totalDone: 14,
            currentStreak: 14,
            lastDoneAt: yesterday,
        },
    },
    {
        id: "7",
        label: "I meditated",
        stats: {
            totalDone: 1,
            currentStreak: 0,
            lastDoneAt: faker.date.past(),
        },
        isFavorite: false,
    },
    {
        id: "8",
        label: "I studied",
        isFavorite: false,
        stats: {
            totalDone: 5,
            currentStreak: 0,
            lastDoneAt: yesterday,
        }
    },
    {
        id: "9",
        label: "I went for a walk",
        stats: {
            totalDone: 12,
            currentStreak: 6,
            lastDoneAt: yesterday,
        },
        isFavorite: false,
    }
]

export const WithTasks: Story = {
    args: {
        tasks: mockTasks
    }
};

export const WithoutTasks: Story = {
    args: {
        tasks: []
    }
}

export const FavoritestTasks: Story = {}