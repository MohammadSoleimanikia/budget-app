import {
    CalendarCheck,
    PiggyBank,
    TrendingDown,
    WalletCards,
} from "lucide-react";
import { useMemo } from "react";

import { useBudgetStore } from "@/features/budgets/store/budgetStore";
import StatsCard from "./StatsCard";

export default function BudgetStats() {
    const budgets = useBudgetStore((state) => state.budgets);
    const expenses = useBudgetStore((state) => state.expenses);

    const stats = useMemo(() => {
        const activeBudgets = budgets.filter(
            (budget) => budget.isArchived !== true,
        );

        const activeBudgetIds = new Set(
            activeBudgets.map((budget) => budget.id),
        );

        const activeExpenses = expenses.filter((expense) =>
            activeBudgetIds.has(expense.budgetId),
        );

        const totalBudget = activeBudgets.reduce(
            (total, budget) => total + budget.max,
            0,
        );

        const totalExpenses = activeExpenses.reduce(
            (total, expense) => total + expense.amount,
            0,
        );

        const remaining = totalBudget - totalExpenses;

        return {
            totalBudget,
            totalExpenses,
            remaining,
            activeBudgetCount: activeBudgets.length,
        };
    }, [budgets, expenses]);

    const isOverBudget = stats.remaining < 0;

    return (
        <div className="my-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatsCard
                title="کل بودجه"
                value={`${stats.totalBudget.toLocaleString("fa-IR")} تومان`}
                description="بودجه‌های فعال"
                icon={<WalletCards className="size-5" />}
                tone="blue"
            />

            <StatsCard
                title={isOverBudget ? "کسری بودجه" : "باقی‌مانده"}
                value={`${Math.abs(stats.remaining).toLocaleString("fa-IR")} تومان`}
                description={
                    isOverBudget ? "بیشتر از بودجه خرج شده" : "از کل بودجه"
                }
                icon={<PiggyBank className="size-5" />}
                tone={isOverBudget ? "red" : "green"}
            />

            <StatsCard
                title="بودجه‌های فعال"
                value={stats.activeBudgetCount}
                description="بودجه در حال اجرا"
                icon={<CalendarCheck className="size-5" />}
                tone="slate"
            />

            <StatsCard
                title="کل هزینه"
                value={`${stats.totalExpenses.toLocaleString("fa-IR")} تومان`}
                description="در بودجه‌های فعال"
                icon={<TrendingDown className="size-5" />}
                tone="red"
            />
        </div>
    );
}
