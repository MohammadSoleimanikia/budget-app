import type { ReactNode } from "react";

import ProgressBar from "../ProgressBar";
import { cn } from "@/lib/utils";
import type { BudgetTone } from "@/features/budgets/constants/budgetIcons";

const toneClasses = {
    blue: {
        iconWrapper: "bg-blue-50 text-blue-600",
        value: "text-blue-600",
    },
    green: {
        iconWrapper: "bg-emerald-50 text-emerald-600",
        value: "text-emerald-600",
    },
    red: {
        iconWrapper: "bg-red-50 text-red-600",
        value: "text-red-600",
    },
    orange: {
        iconWrapper: "bg-orange-50 text-orange-600",
        value: "text-orange-600",
    },
    purple: {
        iconWrapper: "bg-purple-50 text-purple-600",
        value: "text-purple-600",
    },
    slate: {
        iconWrapper: "bg-slate-100 text-slate-700",
        value: "text-slate-800",
    },
} satisfies Record<
    BudgetTone,
    {
        iconWrapper: string;
        value: string;
    }
>;

type BudgetUsageItemProps = {
    title: string;
    progress: number;
    spent: number;
    max: number;
    icon: ReactNode;
    tone?: BudgetTone;
};

export default function BudgetUsageItem({
    title,
    icon,
    progress,
    spent,
    max,
    tone = "blue",
}: BudgetUsageItemProps) {
    const isOverBudget = spent > max;

    return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-28 items-center gap-3">
                    <div
                        className={cn(
                            "flex size-9 items-center justify-center rounded-xl",
                            toneClasses[tone].iconWrapper,
                        )}
                        aria-hidden="true"
                    >
                        {icon}
                    </div>

                    <div className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-700">
                            {title}
                        </span>

                        <span className="mt-1 block text-xs text-slate-500">
                            {spent.toLocaleString("fa-IR")} از{" "}
                            {max.toLocaleString("fa-IR")} تومان
                        </span>
                    </div>
                </div>

                <div
                    className={cn(
                        "w-14 text-left text-sm ",
                        isOverBudget ? "text-red-600" : toneClasses[tone].value,
                    )}
                >
                    {Math.round(progress)}٪
                </div>
            </div>

            <div className="mt-3">
                <ProgressBar progress={progress} />
            </div>
        </div>
    );
}
