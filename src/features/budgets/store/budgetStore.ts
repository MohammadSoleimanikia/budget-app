import { v4 as uuidV4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
    Budget,
    CreateBudgetInput,
    Expense,
} from "@/features/budgets/types/budget.types";

type StoreActionResult = {
    success: boolean;
    message: string;
};
type BudgetStore = {
    budgets: Budget[];
    expenses: Expense[];

    addBudget: (data: CreateBudgetInput) => StoreActionResult;
    deleteBudget: (id: string) => StoreActionResult;

    addExpense: (
        budgetId: string,
        amount: number,
        description: string,
    ) => StoreActionResult;
    deleteExpense: (id: string) => StoreActionResult;

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

                if (!trimmedName || data.max <= 0) {
                    return {
                        success: false,
                        message: "اطلاعات بودجه معتبر نیست.",
                    };
                }

                const isDuplicate = get().budgets.some(
                    (budget) =>
                        budget.name.toLowerCase() ===
                            trimmedName.toLowerCase() && !budget.isArchived,
                );

                if (isDuplicate) {
                    return {
                        success: false,
                        message: "بودجه‌ای با این نام قبلاً ثبت شده است.",
                    };
                }

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

                return {
                    success: true,
                    message: "بودجه با موفقیت اضافه شد.",
                };
            },
            deleteBudget: (id) => {
                const budgetExists = get().budgets.some(
                    (budget) => budget.id === id,
                );

                if (!budgetExists) {
                    return {
                        success: false,
                        message: "بودجه موردنظر پیدا نشد.",
                    };
                }

                set((state) => ({
                    budgets: state.budgets.filter((budget) => budget.id !== id),
                    expenses: state.expenses.filter(
                        (expense) => expense.budgetId !== id,
                    ),
                }));

                return {
                    success: true,
                    message: "بودجه و هزینه‌های مربوط به آن حذف شدند.",
                };
            },

            addExpense: (budgetId, amount, description) => {
                const trimmedDescription = description.trim();

                if (!budgetId || amount <= 0 || !trimmedDescription) {
                    return {
                        success: false,
                        message: "اطلاعات هزینه معتبر نیست.",
                    };
                }

                const budgetExists = get().budgets.some(
                    (budget) =>
                        budget.id === budgetId && budget.isArchived !== true,
                );

                if (!budgetExists) {
                    return {
                        success: false,
                        message: "بودجه انتخاب‌شده معتبر نیست.",
                    };
                }

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

                return {
                    success: true,
                    message: "هزینه با موفقیت ثبت شد.",
                };
            },

            deleteExpense: (id) => {
                const expenseExists = get().expenses.some(
                    (expense) => expense.id === id,
                );

                if (!expenseExists) {
                    return {
                        success: false,
                        message: "هزینه موردنظر پیدا نشد.",
                    };
                }

                set((state) => ({
                    expenses: state.expenses.filter(
                        (expense) => expense.id !== id,
                    ),
                }));

                return {
                    success: true,
                    message: "هزینه با موفقیت حذف شد.",
                };
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
