import { useLocalStorage } from "./useLocalStorage";
import type { Expense } from "../types/expense";
import { v4 as uuidv4 } from 'uuid';

export function useExpenses() {
    const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);

    // 지출/수입 추가
    const addExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense: Expense = {
            ...expense,
            id: uuidv4(), // 랜덤 ID 생성
        };
        setExpenses([...expenses, newExpense]);
    };

    // 삭제
    const deleteExpense = (id: string) => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
    };

    // 수정
    const updateExpense = (id: string, updated: Partial<Expense>) => {
        setExpenses(
            expenses.map((expense) =>
                expense.id === id ? {...expense, ...updated} : expense
            )
        );
    };

    // 총 지출
    const totalExpense = expenses
        .filter((e) => e.type === 'expense')
        .reduce((sum, e) => sum + e.amount, 0);

    // 총 수입
    const totalIncome = expenses
        .filter((e) => e.type === 'income')
        .reduce((sum, e) => sum + e.amount, 0);

    // 잔액
    const balance = totalIncome - totalExpense;

    return {
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        totalExpense,
        totalIncome,
        balance
    };
}