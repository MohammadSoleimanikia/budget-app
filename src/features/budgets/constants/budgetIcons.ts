import type { LucideIcon } from "lucide-react";
import {
    BriefcaseBusiness,
    Car,
    CircleDollarSign,
    Dumbbell,
    Gamepad2,
    Gift,
    GraduationCap,
    HeartPulse,
    Home,
    PiggyBank,
    Plane,
    Shirt,
    ShoppingCart,
    Smartphone,
    Utensils,
    WalletCards,
    Wifi,
} from "lucide-react";

export type BudgetTone =
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "purple"
    | "slate";

export type BudgetIconOption = {
    key: string;
    label: string;
    icon: LucideIcon;
    tone: BudgetTone;
};

export const BUDGET_ICONS = [
    {
        key: "home",
        label: "خانه",
        icon: Home,
        tone: "blue",
    },
    {
        key: "food",
        label: "خوراک",
        icon: Utensils,
        tone: "green",
    },
    {
        key: "transport",
        label: "حمل‌ونقل",
        icon: Car,
        tone: "orange",
    },
    {
        key: "education",
        label: "آموزش",
        icon: GraduationCap,
        tone: "purple",
    },
    {
        key: "health",
        label: "سلامت",
        icon: HeartPulse,
        tone: "red",
    },
    {
        key: "shopping",
        label: "خرید",
        icon: ShoppingCart,
        tone: "blue",
    },
    {
        key: "clothes",
        label: "پوشاک",
        icon: Shirt,
        tone: "purple",
    },
    {
        key: "sport",
        label: "ورزش",
        icon: Dumbbell,
        tone: "green",
    },
    {
        key: "entertainment",
        label: "تفریح",
        icon: Gamepad2,
        tone: "orange",
    },
    {
        key: "travel",
        label: "سفر",
        icon: Plane,
        tone: "blue",
    },
    {
        key: "gift",
        label: "هدیه",
        icon: Gift,
        tone: "red",
    },
    {
        key: "saving",
        label: "پس‌انداز",
        icon: PiggyBank,
        tone: "green",
    },
    {
        key: "bills",
        label: "قبوض",
        icon: WalletCards,
        tone: "slate",
    },
    {
        key: "phone",
        label: "موبایل",
        icon: Smartphone,
        tone: "slate",
    },
    {
        key: "internet",
        label: "اینترنت",
        icon: Wifi,
        tone: "blue",
    },
    {
        key: "income",
        label: "درآمد",
        icon: CircleDollarSign,
        tone: "green",
    },
    {
        key: "work",
        label: "کار",
        icon: BriefcaseBusiness,
        tone: "slate",
    },
] as const satisfies readonly BudgetIconOption[];

export type BudgetIconKey = (typeof BUDGET_ICONS)[number]["key"];

export function getBudgetIconOption(iconKey?: string) {
    return BUDGET_ICONS.find((item) => item.key === iconKey) ?? BUDGET_ICONS[0];
}
