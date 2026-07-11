import { useState } from "react";
import { Wallet } from "lucide-react";
import num2persian from "num2persian";

import Button from "@/components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
    BUDGET_ICONS,
    type BudgetIconKey,
} from "@/features/budgets/constants/budgetIcons";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";
import BudgetIconPicker from "./BudgetIconPicker";

export default function AddBudgetModal() {
    const [open, setOpen] = useState(false);
    const addBudget = useBudgetStore((state) => state.addBudget);

    const [name, setName] = useState("");
    const [max, setMax] = useState("");
    const [iconKey, setIconKey] = useState<BudgetIconKey>("home");

    const selectedIcon = BUDGET_ICONS.find((item) => item.key === iconKey);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const budgetAmount = Number(max);

        if (!name.trim() || budgetAmount <= 0) return;

        addBudget({
            name,
            max: budgetAmount,
            iconKey,
            tone: selectedIcon?.tone ?? "blue",
        });

        setOpen(false);
        setName("");
        setMax("");
        setIconKey("home");
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex w-1/2 items-center justify-center gap-1 text-nowrap bg-[#0F60F6] py-1 text-sm text-white md:py-2">
                <Wallet strokeWidth={1.5} />
                افزودن بودجه
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>افزودن بودجه جدید</DialogTitle>
                    <DialogDescription>
                        برای شروع، نام بودجه، سقف مبلغ و آیکون مناسب را انتخاب
                        کنید.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="mt-3 flex flex-col gap-5"
                >
                    <div className="flex flex-col gap-3">
                        <div className="space-y-2">
                            <label
                                htmlFor="budget-name"
                                className="text-sm font-medium text-slate-700"
                            >
                                نام بودجه
                            </label>

                            <Input
                                id="budget-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="مثلاً اجاره، خوراک، حمل‌ونقل"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="budget-max"
                                className="text-sm font-medium text-slate-700"
                            >
                                سقف بودجه
                            </label>

                            <Input
                                id="budget-max"
                                value={max}
                                onChange={(e) => setMax(e.target.value)}
                                required
                                type="number"
                                min={1}
                                placeholder="مثلاً ۵۰۰۰۰۰۰"
                            />
                        </div>

                        {max && (
                            <p className="rounded-xl bg-slate-50 px-3 py-2 text-right text-sm text-slate-500">
                                {num2persian(Number(max))} تومان
                            </p>
                        )}
                    </div>

                    <BudgetIconPicker
                        value={iconKey}
                        onChange={setIconKey}
                    />

                    <Button type="submit" className="w-full">
                        افزودن بودجه
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}