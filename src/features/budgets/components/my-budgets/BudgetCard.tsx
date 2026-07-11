import { Car, Eye, Plus } from "lucide-react";
import ProgressBar from "../ProgressBar";
import Button from "@/components/ui/Button";

export default function BudgetCard() {
    return (
        <div className="space-y-3 border my-5 p-3 shadow-md border-slate-300 rounded-xl">
            {/* budget name */}
            <div className="flex justify-between">
                <Car />
                <h2 className="flex-1 text-center">حمل و نقل</h2>
            </div>
            {/* progress and total */}
            <div>
                <div className="flex gap-2 items-center">
                    <ProgressBar progress={62} />
                    <p>25%</p>
                </div>

                <p className="text-xs text-slate-500 text-center mt-2">
                    از {(5000).toLocaleString()} تومان
                </p>
            </div>
            <div className="flex justify-around gap-2">
                <Button className="w-3/6" variant={"outline"}>
                    {" "}
                    <Eye className="size-5 ml-1" />
                    مشاهده
                </Button>
                <Button className="w-3/6" variant={"outline"}>
                    <Plus className="size-5 ml-1" /> هزینه
                </Button>
            </div>
        </div>
    );
}