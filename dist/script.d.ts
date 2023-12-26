declare const todosWrapper: HTMLElement | null;
declare const addTodoTitleInput: HTMLInputElement | null;
declare const addTodoDescInput: HTMLInputElement | null;
declare const addTodoForm: HTMLFormElement | null;
declare const searchTodoInput: HTMLInputElement | null;
declare const searchTodoForm: HTMLFormElement | null;
declare const filterButtons: NodeListOf<Element>;
interface Todo {
    id: number;
    title: string;
    description: string;
    complete: boolean;
}
declare let todos: Todo[];
declare function addTodo(e: Event): void;
declare function deleteTodo(id: number): void;
declare function toggleTodo(id: number): void;
declare function filterTodos(e: Event): void;
declare function searchTodos(e: Event): void;
declare function renderTodos(filteredTodos?: Todo[]): void;
//# sourceMappingURL=script.d.ts.map