import { useLocalStorage } from './useLocalStorage';
import type { TodoItem } from '../types/todo';  // type 키워드 추가!
import { v4 as uuidv4 } from 'uuid';

export function useTodos() {
    const [todos, setTodos] = useLocalStorage<TodoItem[]>('todos', []);

    // 추가
    const addTodo = (title: string, isDaily?: boolean) => {
        const newTodo: TodoItem = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
            isDaily
        };
        setTodos([...todos, newTodo]);
    };

    // 완료/미완료 토글
    const toggleTodo = (id: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // 삭제
    const deleteTodo = (id: string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
    };
}