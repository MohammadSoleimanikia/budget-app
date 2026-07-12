import { useMemo, useState } from "react";
import num2persian from "num2persian";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { getBudgetIconOption } from "@/features/budgets/constants/budgetIcons";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";

type AddExpenseFormProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    defaultBudgetId?: string;
};

export default function AddExpenseForm({
    setOpen,
    defaultBudgetId,
}: AddExpenseFormProps) {
    const budgets = useBudgetStore((state) => state.budgets);
    const addExpense = useBudgetStore((state) => state.addExpense);

    const activeBudgets = useMemo(() => {
        return budgets.filter((budget) => budget.isArchived !== true);
    }, [budgets]);

    const [selectedBudgetId, setSelectedBudgetId] = useState(
        defaultBudgetId ?? "",
    );
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    const selectedBudget = activeBudgets.find(
        (budget) => budget.id === selectedBudgetId,
    );

    function resetForm() {
        setSelectedBudgetId(defaultBudgetId ?? "");
        setDescription("");
        setAmount("");
        setError("");
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedDescription = description.trim();
        const expenseAmount = Number(amount);

        if (activeBudgets.length === 0) {
            setError("برای ثبت هزینه، ابتدا باید یک بودجه ایجاد کنید.");
            return;
        }

        if (!selectedBudgetId) {
            setError("لطفاً یک بودجه انتخاب کنید.");
            return;
        }

        if (!trimmedDescription) {
            setError("توضیحات هزینه را وارد کنید.");
            return;
        }

        if (!expenseAmount || expenseAmount <= 0) {
            setError("مبلغ هزینه باید بیشتر از صفر باشد.");
            return;
        }

        addExpense(selectedBudgetId, expenseAmount, trimmedDescription);

        resetForm();
        setOpen(false);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-5">
            <div className="space-y-2">
                <label
                    htmlFor="expense-description"
                    className="text-sm font-medium text-slate-700"
                >
                    توضیحات هزینه
                </label>

                <Input
                    id="expense-description"
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                        setError("");
                    }}
                    required
                    placeholder="مثلاً خرید مواد غذایی"
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="expense-amount"
                    className="text-sm font-medium text-slate-700"
                >
                    مبلغ هزینه
                </label>

                <Input
                    id="expense-amount"
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value);
                        setError("");
                    }}
                    required
                    type="number"
                    min={1}
                    placeholder="مثلاً ۴۵۰۰۰۰"
                />

                {amount && Number(amount) > 0 && (
                    <p className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
                        {num2persian(Number(amount))} تومان
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                    انتخاب بودجه
                </label>

                <Select
                    value={selectedBudgetId}
                    onValueChange={(value) => {
                        setSelectedBudgetId(value);
                        setError("");
                    }}
                    disabled={activeBudgets.length === 0}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="بودجه موردنظر را انتخاب کنید" />
                    </SelectTrigger>

                    <SelectContent>
                        {activeBudgets.map((budget) => {
                            const iconOption = getBudgetIconOption(
                                budget.iconKey,
                            );
                            const Icon = iconOption.icon;

                            return (
                                <SelectItem key={budget.id} value={budget.id}>
                                    <div className="flex items-center gap-2">
                                        <Icon className="size-4" />
                                        <span>{budget.name}</span>
                                    </div>
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                {selectedBudget && (
                    <p className="text-xs text-slate-500">
                        سقف این بودجه:{" "}
                        {selectedBudget.max.toLocaleString("fa-IR")} تومان
                    </p>
                )}
            </div>

            {activeBudgets.length === 0 && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                    لطفاً ابتدا یک بودجه ایجاد کنید.
                </p>
            )}

            {error && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                </p>
            )}

            <Button
                disabled={activeBudgets.length === 0}
                variant={activeBudgets.length === 0 ? "disabled" : "primary"}
                type="submit"
                className="w-full"
            >
                افزودن هزینه
            </Button>
        </form>
    );
}