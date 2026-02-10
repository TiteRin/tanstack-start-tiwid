type Todo = {
    title: string;
    completed: boolean;
    id: string;
}

export function createTodo(text: string): Todo {

    if (!text.trim()) {
        throw new Error("Todo title cannot be empty");
    }

    return {
        title: text,
        completed: false,
        id: crypto.randomUUID()
    }
};

export type { Todo };