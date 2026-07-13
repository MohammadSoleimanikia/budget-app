import type { Budget, Expense } from "@/features/budgets/types/budget.types";

function daysAgo(days: number) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
}

export function createSampleBudgetData(): {
    budgets: Budget[];
    expenses: Expense[];
} {
    const budgets: Budget[] = [
        {
            id: "sample-budget-home",
            name: "خانه و اجاره",
            max: 15000000,
            iconKey: "home",
            tone: "blue",
            createdAt: daysAgo(18),
            updatedAt: daysAgo(2),
            isArchived: false,
        },
        {
            id: "sample-budget-food",
            name: "خوراک",
            max: 8000000,
            iconKey: "food",
            tone: "green",
            createdAt: daysAgo(17),
            updatedAt: daysAgo(1),
            isArchived: false,
        },
        {
            id: "sample-budget-transport",
            name: "حمل‌ونقل",
            max: 3500000,
            iconKey: "transport",
            tone: "orange",
            createdAt: daysAgo(15),
            updatedAt: daysAgo(3),
            isArchived: false,
        },
        {
            id: "sample-budget-education",
            name: "آموزش",
            max: 6000000,
            iconKey: "education",
            tone: "purple",
            createdAt: daysAgo(14),
            updatedAt: daysAgo(4),
            isArchived: false,
        },
        {
            id: "sample-budget-saving",
            name: "پس‌انداز",
            max: 10000000,
            iconKey: "saving",
            tone: "green",
            createdAt: daysAgo(12),
            updatedAt: daysAgo(1),
            isArchived: false,
        },
    ];

    const expenses: Expense[] = [
        {
            id: "sample-expense-rent",
            budgetId: "sample-budget-home",
            description: "اجاره ماهانه",
            amount: 12000000,
            createdAt: daysAgo(10),
        },
        {
            id: "sample-expense-electricity",
            budgetId: "sample-budget-home",
            description: "قبض برق و آب",
            amount: 850000,
            createdAt: daysAgo(4),
        },
        {
            id: "sample-expense-grocery",
            budgetId: "sample-budget-food",
            description: "خرید سوپرمارکت",
            amount: 1850000,
            createdAt: daysAgo(5),
        },
        {
            id: "sample-expense-restaurant",
            budgetId: "sample-budget-food",
            description: "رستوران",
            amount: 720000,
            createdAt: daysAgo(2),
        },
        {
            id: "sample-expense-fruit",
            budgetId: "sample-budget-food",
            description: "میوه و سبزیجات",
            amount: 540000,
            createdAt: daysAgo(1),
        },
        {
            id: "sample-expense-taxi",
            budgetId: "sample-budget-transport",
            description: "تاکسی اینترنتی",
            amount: 460000,
            createdAt: daysAgo(3),
        },
        {
            id: "sample-expense-fuel",
            budgetId: "sample-budget-transport",
            description: "بنزین",
            amount: 300000,
            createdAt: daysAgo(6),
        },
        {
            id: "sample-expense-course",
            budgetId: "sample-budget-education",
            description: "خرید دوره React",
            amount: 2400000,
            createdAt: daysAgo(7),
        },
        {
            id: "sample-expense-book",
            budgetId: "sample-budget-education",
            description: "خرید کتاب آموزشی",
            amount: 650000,
            createdAt: daysAgo(2),
        },
        {
            id: "sample-expense-saving",
            budgetId: "sample-budget-saving",
            description: "واریز به حساب پس‌انداز",
            amount: 4000000,
            createdAt: daysAgo(1),
        },
    ];

    return {
        budgets,
        expenses,
    };
}