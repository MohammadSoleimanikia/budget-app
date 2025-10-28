import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Button from "./ui/Button";
import { useBudgets } from "@/contexts/BudgetContexts";
import { useRef, useState } from "react";
interface AddExpenseFormProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddExpenseForm({ setOpen }: AddExpenseFormProps) {
    const { addExpense, budgets } = useBudgets();
    const [selectBudget, setSelectBudget] = useState("");

    // use useRef to get value of inputs
    const descriptionRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!descriptionRef.current || !amountRef.current || !selectBudget)
            return;
        addExpense(
            selectBudget,
            parseInt(amountRef.current.value),
            descriptionRef.current.value
        );
        setOpen(false);
    }
    return (
        <form onSubmit={handleSubmit} className=" mt-3 flex flex-col gap-5">
            <div className="flex flex-col gap-3 ">
                <Input
                    ref={descriptionRef}
                    required
                    placeholder="توضیحات هزینه "
                />
                <Input
                    ref={amountRef}
                    required
                    type="number"
                    min={0}
                    placeholder="مقدار هزینه"
                />
                <Select onValueChange={setSelectBudget} required>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="بودجه" />
                    </SelectTrigger>
                    <SelectContent>
                        {budgets.map((budget) => {
                            return (
                                <SelectItem key={budget.id} value={budget.id}>
                                    {budget.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit" className="self-start">
                افزودن
            </Button>
        </form>
    );
}
