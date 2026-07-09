import type React from "react";
import {  useCallback,  useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Budget, Expense } from "@/types/budget.types";
import { BudgetContext } from "./BudgetContexts";
export function BudgetsProvider({ children }: { children: React.ReactNode }) {
    const [budgets, setBudgets] = useLocalStorage<Budget[]>("budgets", []);
    const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

    const getBudgetExpenses = useCallback(
        (budgetId: string) => {
            return expenses.filter((expense) => expense.budgetId === budgetId);
        },
        [expenses],
    );

    const addExpense = useCallback(
        (budgetId: string, amount: number, description: string) => {
            setExpenses((prevExpenses) => [
                ...prevExpenses,
                {
                    id: uuidV4(),
                    budgetId,
                    amount,
                    description,
                    createdAt: new Date().toISOString(),
                },
            ]);
        },
        [setExpenses],
    );

    const addBudget = useCallback(
        (name: string, max: number) => {
            const trimmedName = name.trim();

            setBudgets((prevBudgets) => {
                const isDuplicate = prevBudgets.some(
                    (budget) =>
                        budget.name.toLowerCase() === trimmedName.toLowerCase(),
                );

                if (isDuplicate) {
                    return prevBudgets;
                }

                return [
                    ...prevBudgets,
                    { id: uuidV4(), name: trimmedName, max },
                ];
            });
        },
        [setBudgets],
    );

    const deleteBudget = useCallback(
        (id: string) => {
            setBudgets((prevBudgets) =>
                prevBudgets.filter((budget) => budget.id !== id),
            );

            setExpenses((prevExpenses) =>
                prevExpenses.filter((expense) => expense.budgetId !== id),
            );
        },
        [setBudgets, setExpenses],
    );

    const deleteExpense = useCallback(
        (id: string) => {
            setExpenses((prevExpenses) =>
                prevExpenses.filter((expense) => expense.id !== id),
            );
        },
        [setExpenses],
    );

    const value = useMemo(
        () => ({
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        }),
        [
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        ],
    );

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
}
