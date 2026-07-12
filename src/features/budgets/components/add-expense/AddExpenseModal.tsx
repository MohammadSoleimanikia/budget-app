import { useState } from "react";
import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import AddExpenseForm from "./AddExpenseForm";

type AddExpenseModalProps = {
    defaultBudget?: string;
    triggerClassName?: string;
    triggerLabel?: string;
};

export default function AddExpenseModal({
    defaultBudget,
    triggerClassName,
    triggerLabel = "افزودن هزینه",
}: AddExpenseModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={cn(
                    " flex items-center justify-center gap-1 text-nowrap rounded-md bg-[#1CA158] px-3 py-2 text-sm text-white transition hover:bg-emerald-700",
                    triggerClassName,
                )}
            >
                <Plus className="size-4" strokeWidth={1.5} />
                {triggerLabel}
            </DialogTrigger>

            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>افزودن هزینه جدید</DialogTitle>
                </DialogHeader>

                <AddExpenseForm
                    defaultBudgetId={defaultBudget}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    );
}