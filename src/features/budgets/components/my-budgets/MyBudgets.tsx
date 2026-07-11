import BudgetCard from "./BudgetCard";

export default function MyBudgets() {
    return (
        <div className="w-full border my-5 p-3 shadow-md border-slate-300 rounded-xl">
            <h2 className="font-semibold">بودجه های من </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <BudgetCard />
            </div>
        </div>
    );
}
