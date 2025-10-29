import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./contexts/BudgetContexts";
import AddExpenseModal from "./components/AddExpenseModal";
import TotalCard from "./components/TotalCard";

function App() {
    const { budgets, getBudgetExpenses } = useBudgets();
    return (
        <div className="container px-3 sm:px-0 mx-auto border-t border-t-red-700">
            <header className="flex justify-between my-10">
                <h1 className="font-bold text-3xl">مدیریت بودجه</h1>
                <div className=" flex gap-3">
                    <AddExpenseModal  variant="secondary" />
                    <AddBudgetModal />
                </div>
            </header>

            <main className="grid gap-5 sm:grid-cols-1 items-start  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
                {budgets.map((budget) => {
                    const amount = getBudgetExpenses(budget.id).reduce(
                        (total, expense) => {
                            return (total += expense.amount);
                        },
                        0
                    );
                    return (
                        <>
                            <BudgetCard
                                amount={amount}
                                budgetId={budget.id}
                                name={budget.name}
                                max={budget.max}
                            />
                        </>
                    );
                })}
                {budgets.length !== 0 && <TotalCard />}
            </main>
        </div>
    );
}

export default App;
