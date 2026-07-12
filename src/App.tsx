import Header from "./features/budgets/components/header/Header";
import BudgetUsage from "./features/budgets/components/budget-usage/BudgetUsage";
import RecentExpenses from "./features/budgets/components/recent-expenses/RecentExpenses";
import MyBudgets from "./features/budgets/components/my-budgets/MyBudgets";
import BudgetStats from "./features/budgets/components/stats/BudgetStats";
import { Toaster } from "sonner";
import BudgetReports from "./features/budgets/components/reports/BudgetReports";

function App() {
    return (
        <div
            className="container rounded-3xl 
                        mt-5 w-11/12 mx-auto min-h-screen px-3 py-8 
                        bg-linear-to-br md:bg-none from-[#EFF4FE] to-white  "
        >
            <Header />
            <BudgetStats/>
            <BudgetUsage />
            <BudgetReports/>
            <RecentExpenses />
            <MyBudgets />
            <Toaster position="top-center" richColors closeButton />
        </div>
    );
}

export default App;
