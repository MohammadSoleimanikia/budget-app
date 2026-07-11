import { Car, ForkKnife, GraduationCap, Home, TrendingUp } from "lucide-react";
import BudgetUsageItem from "./BudgetUsageItem";

export default function BudgetUsage() {
    return (
        <div className="w-full border my-5 p-3 shadow-md border-slate-300 rounded-xl">
            <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-600" />
                <h2 className="font-semibold">وضعیت مصرف بودجه ها </h2>
            </div>
            <div className="space-y-2 mt-3">
                <BudgetUsageItem icon={<Home />} progress={25} title="اجاره"/>
                <BudgetUsageItem icon={<ForkKnife />} progress={50} title="خوراک"/>
                <BudgetUsageItem icon={<Car />} progress={62} title="حمل و نقل"/>
                <BudgetUsageItem icon={<GraduationCap />} progress={85} title="آموزش"/>
            </div>
        </div>
    );
}
