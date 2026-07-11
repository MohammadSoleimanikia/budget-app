import { Check } from "lucide-react";

import {
    BUDGET_ICONS,
    type BudgetIconKey,
} from "@/features/budgets/constants/budgetIcons";
import { cn } from "@/lib/utils";

type BudgetIconPickerProps = {
    value: BudgetIconKey;
    onChange: (iconKey: BudgetIconKey) => void;
};

const toneClasses = {
    blue: "border-blue-200 bg-blue-50 text-blue-600",
    green: "border-emerald-200 bg-emerald-50 text-emerald-600",
    red: "border-red-200 bg-red-50 text-red-600",
    orange: "border-orange-200 bg-orange-50 text-orange-600",
    purple: "border-purple-200 bg-purple-50 text-purple-600",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
};

export default function BudgetIconPicker({
    value,
    onChange,
}: BudgetIconPickerProps) {
    return (
        <div className="space-y-3">
            <div>
                <p className="text-sm font-medium text-slate-800">
                    انتخاب آیکون
                </p>
                <p className="mt-1 text-xs text-slate-500">
                    آیکون بودجه در کارت‌ها و گزارش‌ها نمایش داده می‌شود.
                </p>
            </div>

            <div className="grid max-h-60 grid-cols-4 gap-2 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-2 sm:grid-cols-5">
                {BUDGET_ICONS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = value === item.key;

                    return (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => onChange(item.key)}
                            className={cn(
                                "relative flex flex-col items-center justify-center gap-1 rounded-2xl border p-3 text-xs transition hover:-translate-y-0.5 hover:shadow-sm",
                                isSelected
                                    ? toneClasses[item.tone]
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
                            )}
                        >
                            {isSelected && (
                                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-white shadow-sm">
                                    <Check className="size-3" />
                                </span>
                            )}

                            <Icon className="size-5" />

                            <span className="line-clamp-1">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
