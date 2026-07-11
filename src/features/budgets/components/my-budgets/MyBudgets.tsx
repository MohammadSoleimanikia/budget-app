import { WalletCards } from "lucide-react";
import { useMemo } from "react";


import AddBudgetModal from "@/features/budgets/components/add-budget/AddBudgetModal";
import BudgetCard from "./BudgetCard";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";

export default function MyBudgets() {
    const budgets = useBudgetStore((state) => state.budgets);

    const activeBudgets = useMemo(() => {
        return budgets.filter((budget) => !budget.isArchived);
    }, [budgets]);

    return (
        <section className="my-5 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <WalletCards className="text-blue-600" />
                    <h2 className="font-semibold text-slate-900">
                        بودجه‌های من
                    </h2>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {activeBudgets.length} بودجه فعال
                </span>
            </div>

            {activeBudgets.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {activeBudgets.map((budget) => (
                        <BudgetCard key={budget.id} budget={budget} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <WalletCards className="size-6" />
                    </div>

                    <h3 className="font-semibold text-slate-800">
                        هنوز بودجه‌ای ثبت نشده
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        برای شروع مدیریت هزینه‌ها، اولین بودجه خودت را بساز.
                    </p>

                    <div className="mt-4">
                        <AddBudgetModal />
                    </div>
                </div>
            )}
        </section>
    );
}
