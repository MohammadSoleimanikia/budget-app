import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Button from "./ui/Button";
import { useBudgets } from "@/hooks/useBudgets";
import { useState } from "react";
import num2persian from "num2persian";

interface AddExpenseFormProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    defaultBudgetId?: string;
}

export default function AddExpenseForm({
    setOpen,
    defaultBudgetId,
}: AddExpenseFormProps) {
    const { addExpense, budgets } = useBudgets();
    const [selectBudget, setSelectBudget] = useState(defaultBudgetId || "");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!description || !amount || !selectBudget) return;

        addExpense(selectBudget, parseInt(amount), description);
        setOpen(false);
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="توضیحات هزینه"
                />

                <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    type="number"
                    min={1}
                    placeholder="مقدار هزینه"
                />

                {amount && (
                    <h2 className="text-right text-sm text-gray-500">
                        {num2persian(Number(amount))} تومان
                    </h2>
                )}

                <Select
                    defaultValue={defaultBudgetId}
                    onValueChange={setSelectBudget}
                    required
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="بودجه" />
                    </SelectTrigger>
                    <SelectContent>
                        {budgets.map((budget) => (
                            <SelectItem key={budget.id} value={budget.id}>
                                {budget.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {budgets.length == 0 && (
                <h2 className="text-red-500 text-right">
                    لطفا ابتدا بودجه ای را اضافه کنید
                </h2>
            )}
            <Button
                disabled={budgets.length == 0}
                variant={budgets.length == 0 ? "disabled" : "primary"}
                type="submit"
                className="self-start"
            >
                افزودن
            </Button>
        </form>
    );
}
