import {taskSchema} from './TaskSchema'
import {describe, it, expect} from "vitest";

describe('Task Validation', () => {
    it("rejects empty string", () => {
        const result = taskSchema.safeParse({label: ""});
        expect(result.success).toBe(false);
    });
})