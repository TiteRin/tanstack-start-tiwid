import {createServerFn} from "@tanstack/react-start";
import {addDoneTaskImpl} from "@/features/tasks/server/task.server.ts";
import {z} from "zod";

const AddDoneTaskInputSchema = z.object({
    label: z.string().trim().min(1),
    userId: z.number()
})

export const addDoneTaskServer = createServerFn({method: 'POST'})
    .inputValidator(AddDoneTaskInputSchema)
    .handler(async ({data}) => {
        return await addDoneTaskImpl(data.label, data.userId)
    })