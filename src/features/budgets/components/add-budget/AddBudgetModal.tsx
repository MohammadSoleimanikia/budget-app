import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import num2persian from "num2persian";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
    createBudgetSchema,
    type CreateBudgetFormValues,
} from "@/features/budgets/schema/budget.schema";
import { useBudgetStore } from "@/features/budgets/store/budgetStore";
import BudgetIconPicker from "./BudgetIconPicker";
import { toast } from "sonner";

export default function AddBudgetModal() {
    const [open, setOpen] = useState(false);
    const addBudget = useBudgetStore((state) => state.addBudget);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateBudgetFormValues>({
        resolver: zodResolver(createBudgetSchema),
        defaultValues: {
            name: "",
            max: "",
            iconKey: "home",
        },
    });

    const max = watch("max");
    const iconKey = watch("iconKey") as BudgetIconKey;

    const selectedIcon = useMemo(() => {
        return BUDGET_ICONS.find((item) => item.key === iconKey);
    }, [iconKey]);

    function handleIconChange(nextIconKey: BudgetIconKey) {
        setValue("iconKey", nextIconKey, {
            shouldValidate: true,
            shouldDirty: true,
        });
    }

    function handleOpenChange(nextOpen: boolean) {
        setOpen(nextOpen);

        if (!nextOpen) {
            reset({
                name: "",
                max: "",
                iconKey: "home",
            });
        }
    }

    function onSubmit(data: CreateBudgetFormValues) {
        const result = addBudget({
            name: data.name,
            max: Number(data.max),
            iconKey: data.iconKey,
            tone: selectedIcon?.tone ?? "blue",
        });

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        reset({
            name: "",
            max: "",
            iconKey: "home",
        });

        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className="flex  items-center justify-center gap-1 text-nowrap bg-[#0F60F6] py-1 text-sm text-white md:py-2">
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
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-3 flex flex-col gap-5"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="budget-name"
                            className="text-sm font-medium text-slate-700"
                        >
                            نام بودجه
                        </label>

                        <Input
                            id="budget-name"
                            {...register("name")}
                            placeholder="مثلاً اجاره، خوراک، حمل‌ونقل"
                            aria-invalid={!!errors.name}
                        />

                        {errors.name && (
                            <p className="text-xs text-red-600">
                                {errors.name.message}
                            </p>
                        )}
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
                            {...register("max")}
                            type="number"
                            min={1}
                            placeholder="مثلاً ۵۰۰۰۰۰۰"
                            aria-invalid={!!errors.max}
                        />

                        {errors.max && (
                            <p className="text-xs text-red-600">
                                {errors.max.message}
                            </p>
                        )}

                        {max && Number(max) > 0 && (
                            <p className="rounded-xl bg-slate-50 px-3 py-2 text-right text-sm text-slate-500">
                                {num2persian(Number(max))} تومان
                            </p>
                        )}
                    </div>

                    <BudgetIconPicker
                        value={iconKey}
                        onChange={handleIconChange}
                    />

                    {errors.iconKey && (
                        <p className="text-xs text-red-600">
                            {errors.iconKey.message}
                        </p>
                    )}

                    <Button type="submit" className="w-full">
                        افزودن بودجه
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
