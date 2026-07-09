import { BudgetContext } from "@/contexts/BudgetContexts";
import { useContext } from "react";

export function useBudgets() {
    const context = useContext(BudgetContext);

    if (!context) {
        throw new Error("useBudgets must be used inside BudgetsProvider");
    }

    return context;
}