import type { ReactNode } from "react";
import { CalendarDays, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BudgetTone } from "@/features/budgets/constants/budgetIcons";

const toneClasses = {
    red: {
        icon: "bg-red-50 text-red-600 ring-red-100",
        badge: "bg-red-50 text-red-700 ring-red-100",
        amount: "text-red-700",
    },
    green: {
        icon: "bg-emerald-50 text-emerald-600 ring-emerald-100",
        badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        amount: "text-emerald-700",
    },
    blue: {
        icon: "bg-blue-50 text-blue-600 ring-blue-100",
        badge: "bg-blue-50 text-blue-700 ring-blue-100",
        amount: "text-blue-700",
    },
    orange: {
        icon: "bg-orange-50 text-orange-600 ring-orange-100",
        badge: "bg-orange-50 text-orange-700 ring-orange-100",
        amount: "text-orange-700",
    },
    purple: {
        icon: "bg-purple-50 text-purple-600 ring-purple-100",
        badge: "bg-purple-50 text-purple-700 ring-purple-100",
        amount: "text-purple-700",
    },
    slate: {
        icon: "bg-slate-100 text-slate-600 ring-slate-200",
        badge: "bg-slate-100 text-slate-700 ring-slate-200",
        amount: "text-slate-800",
    },
} satisfies Record<
    BudgetTone,
    {
        icon: string;
        badge: string;
        amount: string;
    }
>;

type RecentExpenseItemProps = {
    icon?: ReactNode;
    expenseName: string;
    date: string;
    budgetName: string;
    amount: number;
    tone?: BudgetTone;
    onDelete?: () => void;
};

export default function RecentExpenseItem({
    icon = <CalendarDays className="size-5" />,
    expenseName,
    date,
    budgetName,
    amount,
    tone = "slate",
    onDelete,
}: RecentExpenseItemProps) {
    return (
        <article className="group flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md md:flex-row md:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <div
                    className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-2xl ring-1 transition-transform duration-200 group-hover:scale-105",
                        toneClasses[tone].icon,
                    )}
                    aria-hidden="true"
                >
                    {icon}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="max-w-full truncate text-sm font-semibold text-slate-900">
                            {expenseName}
                        </h3>

                        <span
                            className={cn(
                                "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1",
                                toneClasses[tone].badge,
                            )}
                        >
                            {budgetName}
                        </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                            <CalendarDays className="size-3.5" />
                            {date}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 md:min-w-52 md:justify-end md:border-t-0 md:pt-0">
                <div className="flex shrink-0 items-baseline gap-2 text-left">
                    <p className="text-xs text-slate-500">تومان</p>

                    <p
                        className={cn(
                            "text-lg font-bold tracking-tight",
                            toneClasses[tone].amount,
                        )}
                    >
                        {amount.toLocaleString("fa-IR")}
                    </p>
                </div>

                {onDelete && (
                    <Button
                        type="button"
                        variant="remove"
                        onClick={onDelete}
                        className="flex shrink-0 items-center gap-1.5 px-2.5 py-1.5 text-xs"
                    >
                        <Trash2 className="size-4" />
                        حذف
                    </Button>
                )}
            </div>
        </article>
    );
}