export type Budget = {
    id: string;
    name: string;
    max: number;
};

export type Expense = {
    id: string;
    budgetId: string;
    amount: number;
    description: string;
    createdAt: string;
};

export type BudgetContextType = {
    budgets: Budget[];
    expenses: Expense[];
    getBudgetExpenses: (budgetId: string) => Expense[];
    addExpense: (budgetId: string, amount: number, description: string) => void;
    addBudget: (name: string, max: number) => void;
    deleteBudget: (id: string) => void;
    deleteExpense: (id: string) => void;
};