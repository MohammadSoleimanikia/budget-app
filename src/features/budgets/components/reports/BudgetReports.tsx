import { BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { useMemo } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { BudgetTone } from "@/features/budgets/constants/budgetIcons";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";

type BudgetReportItem = {
    id: string;
    name: string;
    max: number;
    spent: number;
    remaining: number;
    progress: number;
    tone: BudgetTone;
};

type TooltipPayloadItem = {
    name?: string;
    value?: number;
    color?: string;
    dataKey?: string;
    payload?: BudgetReportItem;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
};

const chartColors = {
    blue: "#2563eb",
    green: "#059669",
    red: "#dc2626",
    orange: "#ea580c",
    purple: "#9333ea",
    slate: "#475569",
} satisfies Record<BudgetTone, string>;

function formatCurrency(value: number) {
    return `${value.toLocaleString("fa-IR")} تومان`;
}

function BudgetTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-right shadow-lg">
            {label && (
                <p className="mb-2 text-sm font-semibold text-slate-900">
                    {label}
                </p>
            )}

            <div className="space-y-1">
                {payload.map((item) => (
                    <div
                        key={`${item.name}-${item.dataKey}`}
                        className="flex items-center justify-between gap-4 text-xs"
                    >
                        <span className="text-slate-500">{item.name}</span>

                        <span className="font-medium text-slate-800">
                            {formatCurrency(Number(item.value ?? 0))}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function PieTooltip({ active, payload }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;

    const item = payload[0];
    const data = item.payload;

    if (!data) return null;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-right shadow-lg">
            <p className="mb-2 text-sm font-semibold text-slate-900">
                {data.name}
            </p>

            <p className="text-xs text-slate-500">
                هزینه:{" "}
                <span className="font-medium text-slate-800">
                    {formatCurrency(data.spent)}
                </span>
            </p>

            <p className="mt-1 text-xs text-slate-500">
                مصرف بودجه:{" "}
                <span className="font-medium text-slate-800">
                    {Math.round(data.progress)}٪
                </span>
            </p>
        </div>
    );
}

export default function BudgetReports() {
    const budgets = useBudgetStore((state) => state.budgets);
    const expenses = useBudgetStore((state) => state.expenses);

    const reportItems = useMemo<BudgetReportItem[]>(() => {
        return budgets
            .filter((budget) => budget.isArchived !== true)
            .map((budget) => {
                const spent = expenses
                    .filter((expense) => expense.budgetId === budget.id)
                    .reduce((total, expense) => total + expense.amount, 0);

                const remaining = Math.max(budget.max - spent, 0);
                const progress =
                    budget.max > 0
                        ? Math.min((spent / budget.max) * 100, 100)
                        : 0;

                return {
                    id: budget.id,
                    name: budget.name,
                    max: budget.max,
                    spent,
                    remaining,
                    progress,
                    tone: budget.tone,
                };
            })
            .sort((a, b) => b.spent - a.spent);
    }, [budgets, expenses]);

    const pieData = useMemo(() => {
        return reportItems.filter((item) => item.spent > 0);
    }, [reportItems]);

    const hasBudgetData = reportItems.length > 0;
    const hasExpenseData = pieData.length > 0;

    return (
        <section className="my-5 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <BarChart3 className="text-blue-600" />
                    <h2 className="font-semibold text-slate-900">گزارش مالی</h2>
                </div>

                {hasBudgetData && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {reportItems.length} بودجه
                    </span>
                )}
            </div>

            {hasBudgetData ? (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">
                                    مقایسه بودجه و هزینه
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    برای هر بودجه، سقف بودجه و مقدار مصرف‌شده
                                    نمایش داده می‌شود.
                                </p>
                            </div>
                        </div>

                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={reportItems}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 10,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12 }}
                                        tickFormatter={(value) =>
                                            Number(value).toLocaleString(
                                                "fa-IR",
                                            )
                                        }
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip content={<BudgetTooltip />} />
                                    <Legend />

                                    <Bar
                                        dataKey="max"
                                        name="سقف بودجه"
                                        fill="#2563eb"
                                        radius={[8, 8, 0, 0]}
                                    />

                                    <Bar
                                        dataKey="spent"
                                        name="هزینه"
                                        fill="#dc2626"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">
                                    سهم هر بودجه از هزینه‌ها
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    فقط بودجه‌هایی که هزینه ثبت‌شده دارند در این
                                    نمودار نمایش داده می‌شوند.
                                </p>
                            </div>

                            <PieChartIcon className="size-5 text-blue-600" />
                        </div>

                        {hasExpenseData ? (
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="spent"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={105}
                                            paddingAngle={3}
                                        >
                                            {pieData.map((item) => (
                                                <Cell
                                                    key={item.id}
                                                    fill={
                                                        chartColors[item.tone]
                                                    }
                                                />
                                            ))}
                                        </Pie>

                                        <Tooltip content={<PieTooltip />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 text-center">
                                <PieChartIcon className="mb-3 size-10 text-slate-400" />

                                <h3 className="font-semibold text-slate-800">
                                    هنوز هزینه‌ای ثبت نشده
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    بعد از ثبت هزینه، سهم هر بودجه از کل
                                    هزینه‌ها اینجا نمایش داده می‌شود.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
                    <BarChart3 className="mb-3 size-10 text-slate-400" />

                    <h3 className="font-semibold text-slate-800">
                        هنوز گزارشی برای نمایش وجود ندارد
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        بعد از ساخت بودجه و ثبت هزینه، نمودارهای مالی این بخش
                        فعال می‌شوند.
                    </p>
                </div>
            )}
        </section>
    );
}
