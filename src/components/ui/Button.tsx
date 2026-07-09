import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    {
        variants: {
            variant: {
                primary:
                    "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
                secondary:
                    "border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white",
                outline:
                    "border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white",
                outlineSecondary:
                    "border-gray-400 text-gray-600 hover:bg-gray-600 hover:text-white",
                remove: "border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
                disabled: "border-gray-300 bg-gray-200 text-gray-500",
            },
            size: {
                sm: "h-8 px-2 text-xs",
                md: "h-10 px-3",
                lg: "h-11 px-5",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>;

export default function Button({
    variant,
    size,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        >
            {children}
        </button>
    );
}
