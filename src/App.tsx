import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./hooks/useBudgets";
import AddExpenseModal from "./components/AddExpenseModal";
import TotalCard from "./components/TotalCard";

function App() {
    const { budgets, getBudgetExpenses } = useBudgets();

    return (
        <div className="container mx-auto min-h-screen px-3 py-8 sm:px-0">
            <header className="mb-10 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">مدیریت بودجه</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        بودجه‌ها و هزینه‌های خود را ساده‌تر مدیریت کنید.
                    </p>
            </div>

                <div className="flex gap-3">
                    <AddExpenseModal variant="secondary" />
                    <AddBudgetModal />
                </div>
            </header>

            {budgets.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
                    <h2 className="text-xl font-semibold">
                        هنوز بودجه‌ای اضافه نشده
                    </h2>
                    <p className="mt-2 text-gray-500">
                        برای شروع، اولین بودجه خود را ایجاد کنید.
                    </p>
                    <div className="mt-5">
                        <AddBudgetModal />
                    </div>
                </div>
            ) : (
                <main className="grid items-start gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {budgets.map((budget) => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0,
                        );

                        return (
                            <BudgetCard
                                key={budget.id}
                                amount={amount}
                                budgetId={budget.id}
                                name={budget.name}
                                max={budget.max}
                            />
                        );
                    })}

                    <TotalCard />
                </main>
            )}
        </div>
    );
}

export default App;
