import { Eye } from "lucide-react";
import { useMemo } from "react";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";
import ProgressBar from "@/features/budgets/components/ProgressBar";
import AddExpenseModal from "@/features/budgets/components/add-expense/AddExpenseModal";
import {
    getBudgetIconOption,
    type BudgetTone,
} from "@/features/budgets/constants/budgetIcons";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";
import type { Budget } from "@/features/budgets/types/budget.types";
import { toast } from "sonner";

type BudgetCardProps = {
    budget: Budget;
};

const toneClasses = {
    blue: {
        icon: "bg-blue-50 text-blue-600 ring-blue-100",
        title: "text-blue-700",
    },
    green: {
        icon: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        title: "text-emerald-700",
    },
    red: {
        icon: "bg-red-50 text-red-600 ring-red-100",
        title: "text-red-700",
    },
    orange: {
        icon: "bg-orange-50 text-orange-600 ring-orange-100",
        title: "text-orange-700",
    },
    purple: {
        icon: "bg-purple-50 text-purple-600 ring-purple-100",
        title: "text-purple-700",
    },
    slate: {
        icon: "bg-slate-100 text-slate-600 ring-slate-200",
        title: "text-slate-800",
    },
} satisfies Record<
    BudgetTone,
    {
        icon: string;
        title: string;
    }
>;

export default function BudgetCard({ budget }: BudgetCardProps) {
    const expenses = useBudgetStore((state) => state.expenses);
    const deleteBudget = useBudgetStore((state) => state.deleteBudget);

    const budgetExpenses = useMemo(() => {
        return expenses.filter((expense) => expense.budgetId === budget.id);
    }, [expenses, budget.id]);

    const spent = useMemo(() => {
        return budgetExpenses.reduce(
            (total, expense) => total + expense.amount,
            0,
        );
    }, [budgetExpenses]);

    const remaining = budget.max - spent;
    const progress = budget.max > 0 ? (spent / budget.max) * 100 : 0;

    const iconOption = getBudgetIconOption(budget.iconKey);
    const Icon = iconOption.icon;
    const tone = budget.tone ?? iconOption.tone;

    const isOverBudget = spent > budget.max;

    function handleDeleteBudget() {
        const result = deleteBudget(budget.id);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
    }
    return (
        <article className="group space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
            {/* header */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform duration-200 group-hover:scale-105",
                            toneClasses[tone].icon,
                        )}
                        aria-hidden="true"
                    >
                        <Icon className="size-5" />
                    </div>

                    <div className="min-w-0">
                        <h3
                            className={cn(
                                "truncate text-sm font-bold",
                                toneClasses[tone].title,
                            )}
                        >
                            {budget.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            سقف بودجه: {budget.max.toLocaleString("fa-IR")}{" "}
                            تومان
                        </p>
                    </div>
                </div>

                <ConfirmDeleteButton
                    title="حذف بودجه"
                    description={`با حذف بودجه «${budget.name}»، تمام هزینه‌های مربوط به آن هم حذف می‌شوند. این عملیات قابل بازگشت نیست.`}
                    onConfirm={handleDeleteBudget}
                    triggerLabel=""
                    triggerClassName="size-9 rounded-lg p-0"
                    actionLabel="حذف بودجه"
                />
            </div>

            {/* progress */}
            <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>مصرف بودجه</span>
                    <span>{Math.round(progress)}٪</span>
                </div>

                <ProgressBar progress={progress} />

                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                        مصرف‌شده: {spent.toLocaleString("fa-IR")} تومان
                    </span>

                    <span
                        className={cn(
                            "font-medium",
                            isOverBudget ? "text-red-600" : "text-emerald-600",
                        )}
                    >
                        {isOverBudget ? "بیشتر از سقف" : "باقی‌مانده"}:{" "}
                        {Math.abs(remaining).toLocaleString("fa-IR")} تومان
                    </span>
                </div>
            </div>

            {/* actions */}
            <div className="grid grid-cols-2 gap-2">
                <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-1.5"
                >
                    <Eye className="size-4" />
                    مشاهده
                </Button>

                <AddExpenseModal
                    defaultBudget={budget.id}
                    triggerLabel="هزینه"
                    triggerClassName="w-full border-blue-500 bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
                />
            </div>
        </article>
    );
}
