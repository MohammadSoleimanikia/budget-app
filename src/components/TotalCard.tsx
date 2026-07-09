import { useBudgets } from "@/hooks/useBudgets"; 
import ProgressBar from "./ProgressBar";
import { currencyFormatter } from "@/utils";
export default function TotalCard() {
    const { budgets, expenses } = useBudgets();

    const totalBudgets = budgets.reduce((total, budget) => {
        return (total += budget.max);
    }, 0);
    const totalExpenses = expenses.reduce((total, expense) => {
        return (total += expense.amount);
    }, 0);
    const progress = (totalExpenses / totalBudgets) * 100;
    return (
        <div className="border hover:shadow-lg transition-shadow duration-200 border-gray-300 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-baseline ">
                <h1 className="font-medium">مجموع</h1>
                <p>
                    <span className="text-gray-500 ml-1.5 ">
                        تومان{currencyFormatter.format(totalBudgets)} /
                    </span>
                    <span className="font-medium ">
                        تومان {currencyFormatter.format(totalExpenses)}
                    </span>
                </p>
            </div>
            {/* progress bar */}
            <ProgressBar progress={progress} />
        </div>
    );
}
