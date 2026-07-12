import type { ReactNode } from "react";
import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type ConfirmDeleteButtonProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    triggerLabel?: string;
    triggerIcon?: ReactNode;
    triggerClassName?: string;
    actionLabel?: string;
    cancelLabel?: string;
};

export default function ConfirmDeleteButton({
    title,
    description,
    onConfirm,
    triggerLabel = "حذف",
    triggerIcon = <Trash2 className="size-4" />,
    triggerClassName,
    actionLabel = "حذف",
    cancelLabel = "انصراف",
}: ConfirmDeleteButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        "inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50",
                        triggerClassName,
                    )}
                >
                    {triggerIcon}
                    {triggerLabel}
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent dir="rtl">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>

                    <AlertDialogAction onClick={onConfirm}>
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}