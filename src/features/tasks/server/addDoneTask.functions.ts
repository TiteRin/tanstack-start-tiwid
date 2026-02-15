import {createServerFn} from "@tanstack/react-start";
import {getRequest} from "@tanstack/react-start/server";
import {addDoneTaskImpl} from "@/features/tasks/server/task.server.ts";
import {z} from "zod";
import {requireUser} from "@/server/requireUser.ts";

const AddDoneTaskInputSchema = z.object({
    label: z.string().trim().min(1),
})

export const addDoneTaskServer = createServerFn({method: 'POST'})
    .inputValidator(AddDoneTaskInputSchema)
    .handler(async ({data}) => {

        const request = getRequest();
        const userId = await requireUser(request.headers);

        return await addDoneTaskImpl(data.label, userId)
    })