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


export default function AddExpenseModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="border-blue-600 text-blue-700 hover:bg-blue-500 hover:text-white">
                افزودن هزینه
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>افزودن هزینه جدید</DialogTitle>
                    <DialogDescription>
                        <AddExpenseForm setOpen={setOpen}/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
