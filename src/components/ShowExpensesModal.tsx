import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useBudgets } from "@/contexts/BudgetContexts";
import Button from "./ui/Button";
export default function ShowExpensesModal({ budgetId }: { budgetId: string }) {
    const { getBudgetExpenses, budgets,deleteBudget } = useBudgets();
    const budgetExpenses = getBudgetExpenses(budgetId);
    const budget = budgets.find((budget) => budget.id === budgetId);
    return (
        <Dialog>
            <DialogTrigger className="text-gray-500 hover:bg-gray-500 hover:text-white">
                مشاهده هزینه ها
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <div className="flex justify-end items-baseline gap-2">
                        <Button variant="remove" onClick={()=>deleteBudget(budgetId)}>حذف</Button>
                        <DialogTitle>
                            مشاهده هزینه های {budget?.name}
                        </DialogTitle>
                    </div>
                    <DialogDescription>
                        {budgetExpenses.map((expense) => {
                            return <h1>{expense.description}</h1>;
                        })}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
