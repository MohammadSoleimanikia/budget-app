import { ChartSpline } from "lucide-react";
import AddBudgetModal from "../AddBudgetModal";
import AddExpenseModal from "../AddExpenseModal";

export default function Header() {
    return (
        <header className="md:rounded-2xl py-2  md:flex md:justify-between md:px-10 md:bg-linear-to-r from-[#F0F5FE] to-[#D3EEFB] ">
            <div >
                <div className="flex bg-linear-to-r from-[#098AB2] to-[#18b9cd] bg-clip-text text-transparent text-2xl font-semibold items-center gap-5">
                    <div className="flex p-2 justify-center items-center rounded-lg bg-linear-to-br from-[#18b9cd] to-[#1b63f5] size-10" >
                        <ChartSpline strokeWidth={1.5}  className="text-white size-8   " />
                    </div>
                    BudgetFlow
                </div>

                <div className="mt-2 space-y-1.5">
                    <h1 className="text-2xl font-semibold">مدیریت بودجه شخصی</h1>
                    <p className="text-xs text-slate-500">کنترل هوشمندانه درآمد و هزینه ها و  رسیدن به اهداف مالی با برنامه ریزی</p>
                </div>
            </div>
            {/* action buttons */}
            <div className="flex items-center gap-5 mt-5">
                <AddBudgetModal/>
                <AddExpenseModal/>
            </div>
        </header>
    );
}
