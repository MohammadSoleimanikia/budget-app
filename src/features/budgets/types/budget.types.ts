import type {
    BudgetIconKey,
    BudgetTone,
} from "@/features/budgets/constants/budgetIcons";

export type Budget = {
    id: string;
    name: string;
    max: number;
    iconKey: BudgetIconKey;
    tone: BudgetTone;
    createdAt: string;
    updatedAt: string;
    isArchived: boolean;
};

export type Expense = {
    id: string;
    budgetId: string;
    amount: number;
    description: string;
    createdAt: string;
};

export type CreateBudgetInput = {
    name: string;
    max: number;
    iconKey: BudgetIconKey;
    tone: BudgetTone;
};