import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import AddExpenseForm from "./add-expense/AddExpenseForm";
import { Plus } from "lucide-react";
type ModalProp = {
    // optional prop => default value is primary
    variant?: "primary" | "secondary" | "outline" | "outlineSecondary"; // optional;
    // all valid props for button
    defaultBudget?: string;
};
export default function AddExpenseModal({ defaultBudget }: ModalProp) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex text-nowrap justify-center items-center gap-1 w-1/2 py-1 md:py-2 bg-[#1CA158] text-white text-sm">
                <Plus strokeWidth={1.5} />
                افزودن هزینه
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>افزودن هزینه جدید</DialogTitle>
                    <DialogDescription>
                        <AddExpenseForm
                            defaultBudgetId={defaultBudget}
                            setOpen={setOpen}
                        />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
