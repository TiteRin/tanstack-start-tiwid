import { describe, it, expect } from 'vitest'
import { createTodo} from "@/features/todos/utils/createTodo.ts";

describe("CreateTodo", () => {
    it("creates a valid todo", () => {

        const todo = createTodo("Create a valid test");

        expect(todo.title).toBe("Create a valid test");
        expect(todo.completed).toBe(false);
        expect(todo.id).toBeDefined();
    });

    it("throws when the title is empty", () => {
        expect(() => createTodo("")).toThrow();
    });
});