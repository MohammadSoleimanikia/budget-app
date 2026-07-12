import { Eye, ReceiptText } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import ConfirmDeleteButton from "@/components/ui/ConfirmDeleteButton";
import ProgressBar from "@/features/budgets/components/ProgressBar";
import {
    getBudgetIconOption,
    type BudgetTone,
} from "@/features/budgets/constants/budgetIcons";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";
import type { Budget } from "@/features/budgets/types/budget.types";
import { cn } from "@/lib/utils";

type ShowExpensesModalProps = {
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

function formatExpenseDate(date: string) {
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(date));
}

export default function ShowExpensesModal({ budget }: ShowExpensesModalProps) {
    const expenses = useBudgetStore((state) => state.expenses);
    const deleteExpense = useBudgetStore((state) => state.deleteExpense);

    const budgetExpenses = useMemo(() => {
        return expenses
            .filter((expense) => expense.budgetId === budget.id)
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            );
    }, [expenses, budget.id]);

    const spent = useMemo(() => {
        return budgetExpenses.reduce(
            (total, expense) => total + expense.amount,
            0,
        );
    }, [budgetExpenses]);

    const remaining = budget.max - spent;
    const progress = budget.max > 0 ? (spent / budget.max) * 100 : 0;
    const isOverBudget = spent > budget.max;

    const iconOption = getBudgetIconOption(budget.iconKey);
    const Icon = iconOption.icon;
    const tone = budget.tone ?? iconOption.tone;

    function handleDeleteExpense(expenseId: string) {
        const result = deleteExpense(expenseId);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
    }

    return (
        <Dialog>
            <DialogTrigger className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                <Eye className="size-4" />
                مشاهده
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        مشاهده مخارج بودجه
                    </DialogTitle>

                    <DialogDescription>
                        لیست هزینه‌های ثبت‌شده برای این بودجه.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                    {/* Budget summary */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    className={cn(
                                        "flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1",
                                        toneClasses[tone].icon,
                                    )}
                                    aria-hidden="true"
                                >
                                    <Icon className="size-6" />
                                </div>

                                <div className="min-w-0">
                                    <h3
                                        className={cn(
                                            "truncate text-base font-bold",
                                            toneClasses[tone].title,
                                        )}
                                    >
                                        {budget.name}
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        سقف بودجه:{" "}
                                        {budget.max.toLocaleString("fa-IR")}{" "}
                                        تومان
                                    </p>
                                </div>
                            </div>

                            <span
                                className={cn(
                                    "rounded-full px-3 py-1 text-xs font-medium",
                                    isOverBudget
                                        ? "bg-red-50 text-red-600"
                                        : "bg-emerald-50 text-emerald-600",
                                )}
                            >
                                {isOverBudget ? "عبور از سقف" : "در محدوده"}
                            </span>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>مصرف بودجه</span>
                                <span>{Math.round(progress)}٪</span>
                            </div>

                            <ProgressBar progress={progress} />

                            <div className="grid grid-cols-1 gap-2 pt-2 text-sm sm:grid-cols-3">
                                <div className="rounded-xl bg-white p-3">
                                    <p className="text-xs text-slate-500">
                                        کل بودجه
                                    </p>
                                    <p className="mt-1 font-bold text-slate-800">
                                        {budget.max.toLocaleString("fa-IR")}{" "}
                                        تومان
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-3">
                                    <p className="text-xs text-slate-500">
                                        مصرف‌شده
                                    </p>
                                    <p className="mt-1 font-bold text-red-600">
                                        {spent.toLocaleString("fa-IR")} تومان
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-3">
                                    <p className="text-xs text-slate-500">
                                        {isOverBudget
                                            ? "کسری بودجه"
                                            : "باقی‌مانده"}
                                    </p>
                                    <p
                                        className={cn(
                                            "mt-1 font-bold",
                                            isOverBudget
                                                ? "text-red-600"
                                                : "text-emerald-600",
                                        )}
                                    >
                                        {Math.abs(remaining).toLocaleString(
                                            "fa-IR",
                                        )}{" "}
                                        تومان
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expense list */}
                    <div className="rounded-2xl border border-slate-200 bg-white">
                        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <ReceiptText className="size-5 text-blue-600" />
                                <h3 className="text-sm font-semibold text-slate-900">
                                    مخارج ثبت‌شده
                                </h3>
                            </div>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {budgetExpenses.length} مورد
                            </span>
                        </div>

                        {budgetExpenses.length > 0 ? (
                            <div className="divide-y divide-slate-100">
                                {budgetExpenses.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {expense.description}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {formatExpenseDate(
                                                    expense.createdAt,
                                                )}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                                            <div className="text-left">
                                                <p className="text-xs text-slate-500">
                                                    تومان
                                                </p>
                                                <p className="font-bold text-red-600">
                                                    {expense.amount.toLocaleString(
                                                        "fa-IR",
                                                    )}
                                                </p>
                                            </div>

                                            <ConfirmDeleteButton
                                                title="حذف هزینه"
                                                description={`هزینه «${expense.description}» از بودجه «${budget.name}» حذف می‌شود. این عملیات قابل بازگشت نیست.`}
                                                onConfirm={() =>
                                                    handleDeleteExpense(
                                                        expense.id,
                                                    )
                                                }
                                                triggerLabel="حذف"
                                                triggerClassName="px-2.5 py-1.5 text-xs"
                                                actionLabel="حذف هزینه"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
                                <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                                    <ReceiptText className="size-6" />
                                </div>

                                <h3 className="font-semibold text-slate-800">
                                    هنوز هزینه‌ای برای این بودجه ثبت نشده
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    بعد از ثبت هزینه، مخارج این بودجه اینجا
                                    نمایش داده می‌شوند.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
