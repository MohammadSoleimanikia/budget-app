import { createContext } from "react";
import type { BudgetContextType } from "@/types/budget.types";

export const BudgetContext = createContext<BudgetContextType | null>(null);
