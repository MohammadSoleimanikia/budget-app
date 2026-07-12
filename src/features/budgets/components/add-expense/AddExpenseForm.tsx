import { useMemo } from "react";
import num2persian from "num2persian";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
    createExpenseSchema,
    type CreateExpenseFormValues,
} from "@/features/budgets/schema/expenses.schema";
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

    const isDefaultBudgetValid = activeBudgets.some(
        (budget) => budget.id === defaultBudgetId,
    );

    const defaultSelectedBudgetId = isDefaultBudgetValid ? defaultBudgetId : "";

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateExpenseFormValues>({
        resolver: zodResolver(createExpenseSchema),
        defaultValues: {
            description: "",
            amount: "",
            budgetId: defaultSelectedBudgetId,
        },
    });

    const amount = watch("amount");
    const selectedBudgetId = watch("budgetId");

    const selectedBudget = activeBudgets.find(
        (budget) => budget.id === selectedBudgetId,
    );

    function resetForm() {
        reset({
            description: "",
            amount: "",
            budgetId: defaultSelectedBudgetId,
        });
    }

    function onSubmit(data: CreateExpenseFormValues) {
        addExpense(data.budgetId, Number(data.amount), data.description);

        resetForm();
        setOpen(false);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-3 flex flex-col gap-5"
        >
            <div className="space-y-2">
                <label
                    htmlFor="expense-description"
                    className="text-sm font-medium text-slate-700"
                >
                    توضیحات هزینه
                </label>

                <Input
                    id="expense-description"
                    {...register("description")}
                    placeholder="مثلاً خرید مواد غذایی"
                    aria-invalid={!!errors.description}
                />

                {errors.description && (
                    <p className="text-xs text-red-600">
                        {errors.description.message}
                    </p>
                )}
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
                    {...register("amount")}
                    type="number"
                    min={1}
                    placeholder="مثلاً ۴۵۰۰۰۰"
                    aria-invalid={!!errors.amount}
                />

                {errors.amount && (
                    <p className="text-xs text-red-600">
                        {errors.amount.message}
                    </p>
                )}

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
                        setValue("budgetId", value, {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                    disabled={activeBudgets.length === 0}
                >
                    <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.budgetId}
                    >
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

                {errors.budgetId && (
                    <p className="text-xs text-red-600">
                        {errors.budgetId.message}
                    </p>
                )}

                {selectedBudget && (
                    <p className="text-xs text-slate-500">
                        سقف این بودجه:{" "}
                        {selectedBudget.max.toLocaleString("fa-IR")} تومان
                    </p>
                )}
            </div>

            {activeBudgets.length === 0 && (
                <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                    برای ثبت هزینه، ابتدا باید یک بودجه ایجاد کنید.
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
