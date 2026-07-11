import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useBudgets } from "@/features/budgets/context/useBudgets";
import num2persian from "num2persian";
import { Wallet } from "lucide-react";

export default function AddBudgetModal() {
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
            <DialogTrigger className="flex text-nowrap justify-center items-center gap-1 w-1/2 py-1 md:py-2 bg-[#0F60F6] text-white text-sm">
                <Wallet strokeWidth={1.5} />
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
