import { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';
import './TodoList.scss';
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';

export function TodoList() {
    const {todos, addTodo, toggleTodo, deleteTodo} = useTodos();
    const [input, setInput] = useState('');
    const [expandedMonth, setExpandedMonth] = useState<string | null>(() => {
        const now = new Date();
        const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        return currentKey;
    });

    const generateMonths = () => {
        const months = [];
        const start = new Date(2025, 10, 1);
        const end = new Date(2027, 4, 1);


        let current = new Date(start);

        while (current <= end) {
            months.push({
                key: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`,
                label: current.toLocaleDateString('en-US', {
                    month: 'long',  // November (full name)
                }),
                year: current.getFullYear(),
                month: current.getMonth() + 1,
            });

            current.setMonth(current.getMonth() + 1);
        }

        return months;
    }

    const months = generateMonths();

    const getTodosByMonth = (year: number, month: number) => {
        return todos.filter((todo) => {
            const todoDate = new Date(todo.createdAt);

            return (
                todoDate.getFullYear() === year && todoDate.getMonth() + 1 === month
            );
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input.trim());
            setInput('');
        }
    };

    const toggleAccordion = (monthKey: string) => {
        setExpandedMonth(expandedMonth === monthKey ? null : monthKey);
    }

    return (
        <section className="todo-section">
            <form onSubmit={handleSubmit} className="todo-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your to do."
                />
                <button type="submit">ADD</button>
            </form>

            <ul className="accordion">
                {months.map((month) => {
                    const monthTodos = getTodosByMonth(month.year, month.month);
                    const isExpanded = expandedMonth === month.key;

                    return (
                        <li key={month.key} className={isExpanded ? "expanded" : ""}>
                            <button
                                className="accordion-header"
                                onClick={() => toggleAccordion(month.key)}
                            >
                                <span>{month.label}</span>
                                <span>{month.year}</span>
                            </button>
                            {isExpanded &&
                                <div className="accordion-content">
                                    {monthTodos.length > 0 ? (
                                        <ul className="todo-list">
                                            {monthTodos.map((todo) => (
                                                <li
                                                    key={todo.id}
                                                    className={todo.completed ? 'completed' : ''}
                                                >
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={todo.completed}
                                                            onChange={() => toggleTodo(todo.id)}
                                                        />
                                                        <span>{todo.title}</span>
                                                    </label>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => deleteTodo(todo.id)}
                                                    >
                                                        🗑️
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="empty-message"></p>
                                    )}
                                </div>
                            }
                        </li>
                    )
                })}
            </ul>



            {/*            {todos.length === 0 && (
                <p className="empty-message">No data</p>
            )}*/}
        </section>
    );
}