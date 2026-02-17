import {TaskOverview} from "@/features/tasks/ui/components/TaskQuickList";
import {faker} from "@faker-js/faker";
import {createServerFn} from "@tanstack/react-start";
import {z} from "zod";

const GetUserTaskOverviewSchema = z.object({
    userId: z.string()
});

const today = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));


export const getUserTaskOverviewServer = createServerFn()
    .inputValidator(GetUserTaskOverviewSchema)
    .handler(async ({data}) => {

        const mock: TaskOverview[] = [
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
        ];

        return mock;
    })