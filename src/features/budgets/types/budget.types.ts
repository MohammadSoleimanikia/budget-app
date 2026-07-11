export type Tones = "blue" | "green" | "red" | "orange" | "purple" | "slate";

export type Budget = {
    id: string;
    name: string;
    max: number;

    iconKey?: string;
    tone?: Tones;

    createdAt: string;
    updatedAt: string;
    isArchived: boolean;
};

export type Expense = {
    id: string;
    budgetId: string;
    amount: number;
    description: string;
    createdAt: string;
};
