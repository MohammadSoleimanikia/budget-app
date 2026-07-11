import { Clock4, Home } from "lucide-react";
import RecentExpenseItem from "./RecentExpenseItem";

export default function RecentExpenses() {
    return (
        <div className="w-full border my-5 p-3 shadow-md border-slate-300 rounded-xl">
            <div className=" mb-3 flex items-center gap-2">
                <Clock4 className="text-blue-600" />
                <h2 className="font-semibold">آخرین هزینه ها</h2>
            </div>
            <RecentExpenseItem
                expenseName="اجاره آپارتمان"
                date="۱۴۰۳/۰۳/۲۰"
                budgetName="اجاره"
                amount={1500000}
                icon={<Home className="size-5" />}
                tone="red"
                onDelete={() => console.log("test")}
            />
            <RecentExpenseItem
                expenseName="اجاره آپارتمان"
                date="۱۴۰۳/۰۳/۲۰"
                budgetName="اجاره"
                amount={1500000}
                icon={<Home className="size-5" />}
                tone="red"
                onDelete={() => console.log("test")}
            />
        </div>
    );
}
