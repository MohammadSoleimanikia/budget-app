import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./hooks/useBudgets";
import TotalCard from "./components/TotalCard";
import Header from "./components/header/Header";
import StatsCard from "./components/stats/StatsCard";
import BudgetUsage from "./components/budgetUsage/BudgetUsage";
import { CalendarCheck, PiggyBank, TrendingDown } from "lucide-react";
import RecentExpenses from "./components/recentExpenses/RecentExpenses";

function App() {
    const { budgets, getBudgetExpenses } = useBudgets();
    return (
        <div
            className="container rounded-3xl 
                        mt-5 w-11/12 mx-auto min-h-screen px-3 py-8 
                        bg-linear-to-br md:bg-none from-[#EFF4FE] to-white  "
        >
            <Header />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
                <StatsCard
                    title="کل بودجه"
                    value={`${(25000).toLocaleString("fa-IR")} تومان`}
                    description="در این ماه"
                />
                <StatsCard
                    icon={<PiggyBank />}
                    tone="green"
                    title="باقی مانده"
                    value={`${(25000).toLocaleString("fa-IR")} تومان`}
                    description="از کل بودجه"
                />
                <StatsCard
                    icon={<CalendarCheck />}
                    tone="green"
                    title="بودجه های فعال"
                    value={8}
                    description="بودجه در حال اجرا"
                />
                <StatsCard
                    icon={<TrendingDown />}
                    tone="red"
                    title="کل هزینه"
                    value={`${(25000).toLocaleString("fa-IR")} تومان`}
                    description="در این ماه"
                />
            </div>
            <BudgetUsage />
            <RecentExpenses />
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
