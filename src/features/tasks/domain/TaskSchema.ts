import { z } from "zod";

export const taskSchema = z.object({
    label: z.string().min(1)
});