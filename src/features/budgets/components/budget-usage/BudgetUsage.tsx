import { TrendingUp, WalletCards } from "lucide-react";
import { useMemo } from "react";

import { getBudgetIconOption } from "@/features/budgets/constants/budgetIcons";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";
import BudgetUsageItem from "./BudgetUsageItem";

export default function BudgetUsage() {
    const budgets = useBudgetStore((state) => state.budgets);
    const expenses = useBudgetStore((state) => state.expenses);

    const budgetUsageItems = useMemo(() => {
        return budgets
            .filter((budget) => budget.isArchived !== true)
            .map((budget) => {
                const spent = expenses
                    .filter((expense) => expense.budgetId === budget.id)
                    .reduce((total, expense) => total + expense.amount, 0);

                const progress =
                    budget.max > 0 ? (spent / budget.max) * 100 : 0;

                const iconOption = getBudgetIconOption(budget.iconKey);

                return {
                    id: budget.id,
                    title: budget.name,
                    progress,
                    spent,
                    max: budget.max,
                    icon: iconOption.icon,
                    tone: budget.tone ?? iconOption.tone,
                };
            })
            .sort((a, b) => b.progress - a.progress)
            .slice(0, 5);
    }, [budgets, expenses]);

    return (
        <section className="my-5 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-blue-600" />
                    <h2 className="font-semibold text-slate-900">
                        بودجه ها به ترتیب بیشترین استفاده
                    </h2>
                </div>

                {budgetUsageItems.length > 0 && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {budgetUsageItems.length} مورد
                    </span>
                )}
            </div>

            {budgetUsageItems.length > 0 ? (
                <div className="space-y-3">
                    {budgetUsageItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <BudgetUsageItem
                                key={item.id}
                                icon={<Icon className="size-5" />}
                                title={item.title}
                                progress={item.progress}
                                spent={item.spent}
                                max={item.max}
                                tone={item.tone}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <WalletCards className="size-6" />
                    </div>

                    <h3 className="font-semibold text-slate-800">
                        هنوز بودجه‌ای برای نمایش وجود ندارد
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        بعد از ساخت بودجه، وضعیت مصرف آن در این بخش نمایش داده
                        می‌شود.
                    </p>
                </div>
            )}
        </section>
    );
}