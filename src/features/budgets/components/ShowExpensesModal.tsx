import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useBudgets } from "@/features/budgets/context/useBudgets";
import Button from "@/components/ui/Button";
export default function ShowExpensesModal({ budgetId }: { budgetId: string }) {
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
        useBudgets();
    const budgetExpenses = getBudgetExpenses(budgetId);
    const budget = budgets.find((budget) => budget.id === budgetId);
    return (
        <Dialog>
            <DialogTrigger className="text-gray-500 hover:bg-gray-500 hover:text-white">
                مشاهده هزینه ها
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <div className="flex justify-end items-baseline gap-2 mt-5 sm:mt-0">
                        <Button
                            variant="remove"
                            onClick={() => {
                                if (
                                    confirm(
                                        "آیا مطمئنی میخوای بودجه رو پاک کنی ؟",
                                    )
                                )
                                    deleteBudget(budgetId);
                            }}
                        >
                            حذف
                        </Button>
                        <DialogTitle>
                            مشاهده هزینه های {budget?.name}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="flex flex-col gap-2 text-base">
                        {budgetExpenses.map((expense) => {
                            return (
                                <div
                                    className="flex bg items-baseline rounded bg-gray-100 p-1 px-2 justify-between"
                                    key={expense.id}
                                >
                                    <div className="flex gap-2 items-baseline">
                                        <Button
                                            variant="remove"
                                            onClick={() =>
                                                deleteExpense(expense.id)
                                            }
                                        >
                                            {" "}
                                            x{" "}
                                        </Button>
                                        <p>{expense.amount}</p>
                                    </div>
                                    <h2>{expense.description}</h2>
                                </div>
                            );
                        })}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
