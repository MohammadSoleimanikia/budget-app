import { currencyFormatter } from "../utils";
import ProgressBar from "./ProgressBar";
import Button from "./ui/Button";
type BudgetCardProps = {
    name: string;
    amount: number;
    max: number;
};
export default function BudgetCard({ name, amount, max }: BudgetCardProps) {
    const progress= (amount/max)*100;
    return (
        <div className="border hover:shadow-lg transition-shadow duration-200 border-gray-300 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-baseline ">
                <h1 className="font-medium">{name}</h1>
                <p>
                    <span className="text-gray-500 ml-1.5 ">
                        تومان{currencyFormatter.format(max)} /
                    </span>
                    <span className="font-medium ">
                        تومان {currencyFormatter.format(amount)}
                    </span>
                </p>
            </div>
            {/* progress bar */}
            <ProgressBar progress={progress}/>
            <div className="flex justify-center gap-3 ">
                <Button variant="outline">
                    افزودن هزینه{" "}
                </Button>
                <Button variant="outlineSecondary">
                    نمایش هزینه ها{" "}
                </Button>
            </div>
        </div>
    );
}
