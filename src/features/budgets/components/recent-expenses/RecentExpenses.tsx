import { Clock4, ReceiptText } from "lucide-react";
import { useMemo } from "react";

import {
    getBudgetIconOption,
    type BudgetTone,
} from "@/features/budgets/constants/budgetIcons";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";

import RecentExpenseItem from "./RecentExpenseItem";

const MAX_RECENT_EXPENSES = 5;

function formatExpenseDate(date: string) {
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(date));
}

export default function RecentExpenses() {
    const budgets = useBudgetStore((state) => state.budgets);
    const expenses = useBudgetStore((state) => state.expenses);
    const deleteExpense = useBudgetStore((state) => state.deleteExpense);

    const recentExpenses = useMemo(() => {
        return [...expenses]
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            )
            .slice(0, MAX_RECENT_EXPENSES)
            .map((expense) => {
                const budget = budgets.find(
                    (budget) => budget.id === expense.budgetId,
                );

                const iconOption = getBudgetIconOption(budget?.iconKey);
                const Icon = iconOption.icon;

                return {
                    id: expense.id,
                    expenseName: expense.description,
                    date: formatExpenseDate(expense.createdAt),
                    budgetName: budget?.name ?? "بودجه حذف‌شده",
                    amount: expense.amount,
                    icon: <Icon className="size-5" />,
                    tone: (budget?.tone ?? iconOption.tone) as BudgetTone,
                };
            });
    }, [expenses, budgets]);

    return (
        <section className="my-5 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Clock4 className="text-blue-600" />
                    <h2 className="font-semibold text-slate-900">
                        آخرین هزینه‌ها
                    </h2>
                </div>

                {recentExpenses.length > 0 && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {recentExpenses.length} مورد اخیر
                    </span>
                )}
            </div>

            {recentExpenses.length > 0 ? (
                <div className="space-y-3">
                    {recentExpenses.map((expense) => (
                        <RecentExpenseItem
                            key={expense.id}
                            expenseName={expense.expenseName}
                            date={expense.date}
                            budgetName={expense.budgetName}
                            amount={expense.amount}
                            icon={expense.icon}
                            tone={expense.tone}
                            onDelete={() => deleteExpense(expense.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <ReceiptText className="size-6" />
                    </div>

                    <h3 className="font-semibold text-slate-800">
                        هنوز هزینه‌ای ثبت نشده
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        بعد از ثبت هزینه، آخرین تراکنش‌ها در این بخش نمایش داده
                        می‌شوند.
                    </p>
                </div>
            )}
        </section>
    );
}