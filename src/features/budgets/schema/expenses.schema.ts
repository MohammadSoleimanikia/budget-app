import { z } from "zod";
export const createExpenseSchema = z.object({
    description: z
        .string()
        .trim()
        .min(2, "توضیحات حداقل باید دو کاراکتر باشد")
        .max(80, "توضیحات هزینه نباید بیشتر از ۸۰ کاراکتر باشد."),

    amount: z
        .string()
        .min(1, "مبلغ هزینه را وارد کنید.")
        .refine((value) => Number.isFinite(Number(value)), {
            message: "مبلغ هزینه معتبر نیست.",
        })
        .refine((value) => Number(value) > 0, {
            message: "مبلغ هزینه باید بیشتر از صفر باشد.",
        }),

    budgetId: z.string().min(1, "لطفاً یک بودجه انتخاب کنید."),
});

export type CreateExpenseFormValues = z.infer<typeof createExpenseSchema>;
