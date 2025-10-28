import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "./ui/Button";
import { useRef, useState } from "react";
import { useBudgets } from "@/contexts/BudgetContexts";


export default function AddBudgetModal() {
    const [open,setOpen]=useState(false)
    const { addBudget } = useBudgets();
    // use useRef to get value of inputs
    const nameRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!nameRef.current || !maxRef.current) return;
        addBudget(nameRef.current.value, parseInt(maxRef.current.value));
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-blue-500 text-white  hover:bg-blue-600">
                افزودن بودجه
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>افزودن بودجه جدید</DialogTitle>
                    <DialogDescription>
                        <form
                            onSubmit={handleSubmit}
                            className=" mt-3 flex flex-col gap-5"
                        >
                            <div className="flex flex-col gap-3 ">
                                <Input
                                    ref={nameRef}
                                    required
                                    placeholder="نام بودجه "
                                />
                                <Input
                                    ref={maxRef}
                                    required
                                    type="number"
                                    min={0}
                                    placeholder="حداکثر بودجه "
                                />
                            </div>
                            <Button type="submit" className="self-start">
                                افزودن
                            </Button>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
