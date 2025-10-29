import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import AddExpenseForm from "./AddExpenseForm";
import { clsx } from "clsx";
type ModalProp = {
    // optional prop => default value is primary
    variant?: "primary" | "secondary" | "outline" | "outlineSecondary"; // optional;
    // all valid props for button
    defaultBudget?:string;
};
export default function AddExpenseModal({ variant = "primary",defaultBudget}:ModalProp) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger className={clsx(
                        variant == "primary"
                            ? "bg-blue-500 text-white  hover:bg-blue-600"
                            : variant == "secondary"
                            ? "border-blue-600 text-blue-700 hover:bg-blue-500 hover:text-white"
                            : variant == "outline"
                            ? " text-blue-500 hover:text-white hover:bg-blue-500"
                            : " text-gray-500 hover:bg-gray-500 hover:text-white",
                            // add custom class name
                    )}>
                افزودن هزینه

            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>افزودن هزینه جدید</DialogTitle>
                    <DialogDescription>
                        <AddExpenseForm defaultBudgetId={defaultBudget} setOpen={setOpen}/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
