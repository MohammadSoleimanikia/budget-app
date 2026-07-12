import { z } from "zod";
import {
    BUDGET_ICONS,
    type BudgetIconKey,
} from "@/features/budgets/constants/budgetIcons";

function isValidBudgetIconKey(value: unknown): value is BudgetIconKey {
    return (
        typeof value === "string" &&
        BUDGET_ICONS.some((icon) => icon.key === value)
    );
}

export const createBudgetSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "نام بودجه باید حداقل 2 کاراکتر باشد")
        .max(40, "نام بودجه نباید بیشتر تز 40 کاراکتر باشد"),
    max: z
        .string()
        .min(1, "سقف بودجه را وارد کنید ")
        .refine((value) => Number(value) > 0, {
            message: "سقف بودجه باید بیشتر از صفر باشد",
        }),
    iconKey: z.custom<BudgetIconKey>(isValidBudgetIconKey, {
        message: "لطفا یک آیکون معتبر انتخاب کنید ",
    }),
});
export type CreateBudgetFormValues = z.infer<typeof createBudgetSchema>;
