import Header from "./features/budgets/components/header/Header";
import StatsCard from "./features/budgets/components/stats/StatsCard";
import BudgetUsage from "./features/budgets/components/budget-usage/BudgetUsage";
import { CalendarCheck, PiggyBank, TrendingDown } from "lucide-react";
import RecentExpenses from "./features/budgets/components/recent-expenses/RecentExpenses";
import MyBudgets from "./features/budgets/components/my-budgets/MyBudgets";

function App() {
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
            <MyBudgets />
        </div>
    );
}

export default App;
