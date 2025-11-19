export interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
    type: 'expense' | 'income';
}

export interface SavingsGoal {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline?: string;
}

