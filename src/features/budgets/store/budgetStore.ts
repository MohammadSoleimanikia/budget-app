import { v4 as uuidV4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
    Budget,
    CreateBudgetInput,
    Expense,
} from "@/features/budgets/types/budget.types";

type BudgetStore = {
    budgets: Budget[];
    expenses: Expense[];

    addBudget: (data: CreateBudgetInput) => void;
    deleteBudget: (id: string) => void;

    addExpense: (
        budgetId: string,
        amount: number,
        description: string,
    ) => void;
    deleteExpense: (id: string) => void;

    getBudgetExpenses: (budgetId: string) => Expense[];
    getBudgetSpent: (budgetId: string) => number;

    resetBudgetStore: () => void;
};

export const useBudgetStore = create<BudgetStore>()(
    persist(
        (set, get) => ({
            budgets: [],
            expenses: [],

            addBudget: (data) => {
                const trimmedName = data.name.trim();

                if (!trimmedName || data.max <= 0) return;

                const isDuplicate = get().budgets.some(
                    (budget) =>
                        budget.name.toLowerCase() ===
                            trimmedName.toLowerCase() &&
                        !budget.isArchived,
                );

                if (isDuplicate) return;

                const now = new Date().toISOString();

                const newBudget: Budget = {
                    id: uuidV4(),
                    name: trimmedName,
                    max: data.max,
                    iconKey: data.iconKey,
                    tone: data.tone,
                    createdAt: now,
                    updatedAt: now,
                    isArchived: false,
                };

                set((state) => ({
                    budgets: [...state.budgets, newBudget],
                }));
            },

            deleteBudget: (id) => {
                set((state) => ({
                    budgets: state.budgets.filter(
                        (budget) => budget.id !== id,
                    ),
                    expenses: state.expenses.filter(
                        (expense) => expense.budgetId !== id,
                    ),
                }));
            },

            addExpense: (budgetId, amount, description) => {
                const trimmedDescription = description.trim();

                if (!budgetId || amount <= 0 || !trimmedDescription) return;

                const newExpense: Expense = {
                    id: uuidV4(),
                    budgetId,
                    amount,
                    description: trimmedDescription,
                    createdAt: new Date().toISOString(),
                };

                set((state) => ({
                    expenses: [...state.expenses, newExpense],
                }));
            },

            deleteExpense: (id) => {
                set((state) => ({
                    expenses: state.expenses.filter(
                        (expense) => expense.id !== id,
                    ),
                }));
            },

            getBudgetExpenses: (budgetId) => {
                return get().expenses.filter(
                    (expense) => expense.budgetId === budgetId,
                );
            },

            getBudgetSpent: (budgetId) => {
                return get()
                    .expenses.filter((expense) => expense.budgetId === budgetId)
                    .reduce((total, expense) => total + expense.amount, 0);
            },

            resetBudgetStore: () => {
                set({
                    budgets: [],
                    expenses: [],
                });
            },
        }),
        {
            name: "budget-flow-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                budgets: state.budgets,
                expenses: state.expenses,
            }),
        },
    ),
);