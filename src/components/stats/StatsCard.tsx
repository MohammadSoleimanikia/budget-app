import type { ReactNode } from "react";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

type StatsCardTone = "blue" | "green" | "red" | "orange" | "slate";

type StatsCardProps = {
    title: string;
    value: ReactNode;
    description?: string;
    icon?: ReactNode;
    tone?: StatsCardTone;
    className?: string;
};

const toneClasses: Record<
    StatsCardTone,
    {
        iconWrapper: string;
        value: string;
    }
> = {
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
        iconWrapper: "bg-slate-100 text-slate-600",
        value: "text-slate-800",
    },
};

export default function StatsCard({
    title,
    value,
    description,
    icon = <Wallet className="size-5" />,
    tone = "blue",
    className,
}: StatsCardProps) {
    return (
        <article
            className={cn(
                "w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                className,
            )}
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-sm font-semibold text-slate-600">
                        {title}
                    </h2>

                    <p className={cn("mt-2 text-xl flex items-center gap-1 ", toneClasses[tone].value)}>
                        {value}
                    </p>

                    {description && (
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            {description}
                        </p>
                    )}
                </div>

                <div
                    className={cn(
                        "flex size-12 items-center justify-center rounded-2xl",
                        toneClasses[tone].iconWrapper,
                    )}
                    aria-hidden="true"
                >
                    {icon}
                </div>
            </div>
        </article>
    );
}
