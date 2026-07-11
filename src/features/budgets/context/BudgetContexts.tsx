import { createContext } from "react";
import type { BudgetContextType } from "@/features/budgets/types/budget.types";

export const BudgetContext = createContext<BudgetContextType | null>(null);
