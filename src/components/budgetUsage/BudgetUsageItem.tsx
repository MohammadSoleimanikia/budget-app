import type { ReactNode } from "react";

import ProgressBar from "../ProgressBar";
import { cn } from "@/lib/utils";

type BudgetUsageItemTone = "blue" | "green" | "red" | "orange" | "slate";

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
    slate: {
        iconWrapper: "bg-slate-100 text-slate-700",
        value: "text-slate-800",
    },
} satisfies Record<
    BudgetUsageItemTone,
    {
        iconWrapper: string;
        value: string;
    }
>;

type BudgetUsageItemProps = {
    title: string;
    progress: number;
    icon: ReactNode;
    tone?: BudgetUsageItemTone;
};

export default function BudgetUsageItem({
    title,
    icon,
    progress,
    tone = "blue",
}: BudgetUsageItemProps) {
    return (
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

                <span className="text-sm font-medium text-slate-700">
                    {title}
                </span>
            </div>

            <div className="flex-1">
                <ProgressBar  progress={progress} />
            </div>

            <div
                className={cn(
                    "w-12 text-left text-sm ",
                    toneClasses[tone].value,
                )}
            >
                {Math.round(progress)}%
            </div>
        </div>
    );
}
