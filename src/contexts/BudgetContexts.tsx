import type React from "react";
import { createContext, useContext } from "react";
// used for add unique ID
import { v4 as uuidV4 } from "uuid";
// import custom hook to use local storage
import useLocalStorage from "@/hooks/useLocalStorage";

// types
type Budget = {
    id: string;
    name: string;
    max: number;
};

type Expense = {
    id: string;
    budgetId: string;
    amount: number;
    description: string;
};

type BudgetContextType = {
    budgets: Budget[];
    expenses: Expense[];
    getBudgetExpenses: (budgetId: string) => Expense[];
    addExpense: (budgetId: string, amount: number, description: string) => void;
    addBudget: (name: string, max: number) => void;
    deleteBudget: (id: string) => void;
    deleteExpense: (id: string) => void;
};

const BudgetContext = createContext<BudgetContextType>({} as BudgetContextType);

export const BudgetsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [budgets, setBudgets] = useLocalStorage<Budget[]>("budgets", []);
    const [expenses, setExpenses] = useLocalStorage<Expense[]>("expenses", []);

    // get expenses related to specific budget
    function getBudgetExpenses(budgetId: string) {
        return expenses.filter((expense) => expense.budgetId == budgetId);
    }

    // add expense to specific budget
    function addExpense(budgetId: string, amount: number, description: string) {
        setExpenses((prevExpenses) => {
            return [
                ...prevExpenses,
                { id: uuidV4(), budgetId, amount, description },
            ];
        });
    }

    // add a budget
    function addBudget(name: string, max: number) {
        setBudgets((prevBudgets) => {
            // check if budget name is already added.
            if (prevBudgets.find((budget) => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, { id: uuidV4(), name, max }];
        });
    }

    function deleteBudget(id: string) {
        // TODO : Deal with expenses.
        setBudgets((prevBudget) => {
            return prevBudget.filter((budget) => budget.id !== id);
        });
    }

    function deleteExpense(id: string) {
        setExpenses((prevExpenses) => {
            return prevExpenses.filter((expense) => expense.id !== id);
        });
    }

    return (
        <BudgetContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addExpense,
                addBudget,
                deleteBudget,
                deleteExpense,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};
// for removing fast refresh error
// eslint-disable-next-line react-refresh/only-export-components
export function useBudgets(){
  return useContext(BudgetContext);
}