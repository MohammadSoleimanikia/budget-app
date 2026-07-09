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
import { useState } from "react";
import { useBudgets } from "@/hooks/useBudgets";
import num2persian from "num2persian";
import { clsx } from "clsx";

type ModalProp = {
    variant?: "primary" | "secondary" | "outline" | "outlineSecondary";
};

export default function AddBudgetModal({ variant = "primary" }: ModalProp) {
    const [open, setOpen] = useState(false);
    const { addBudget } = useBudgets();

    // controlled states
    const [name, setName] = useState("");
    const [max, setMax] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!name || !max) return;
        addBudget(name, parseInt(max));
        setOpen(false);
        setName("");
        setMax("");
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={clsx(
                    variant === "primary"
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : variant === "secondary"
                          ? "border border-blue-600 text-blue-700 hover:bg-blue-500 hover:text-white"
                          : variant === "outline"
                            ? "text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500"
                            : "text-gray-500 border border-gray-400 hover:bg-gray-500 hover:text-white",
                    "px-3 py-2 rounded-lg transition-all",
                )}
            >
                افزودن بودجه
            </DialogTrigger>

            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>افزودن بودجه جدید</DialogTitle>
                    <DialogDescription>
                        برای شروع، نام بودجه و سقف مبلغ را وارد کنید.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="mt-3 flex flex-col gap-5"
                >
                    <div className="flex flex-col gap-3">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="نام بودجه"
                        />

                        <Input
                            value={max}
                            onChange={(e) => setMax(e.target.value)}
                            required
                            type="number"
                            min={1}
                            placeholder="حداکثر بودجه"
                        />

                        {max && (
                            <h2 className="text-right text-sm text-gray-500">
                                {num2persian(Number(max))} تومان
                            </h2>
                        )}
                    </div>

                    <Button type="submit" className="self-start">
                        افزودن
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
