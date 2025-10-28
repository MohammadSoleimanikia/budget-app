import clsx from "clsx";

type ButtonProps = {
    children: React.ReactNode;
    // optional prop => default value is primary
    variant?: "primary" | "secondary" | "outline" | "outlineSecondary"; // optional;
    // all valid props for button
}& React.ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ variant = "primary", children,...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={clsx(
                variant == "primary"
                    ? "bg-blue-500 text-white  hover:bg-blue-600"
                    : variant == "secondary"
                    ? "border-blue-600 text-blue-700 hover:bg-blue-500 hover:text-white"
                    : variant == "outline"
                    ? " text-blue-500 hover:text-white hover:bg-blue-500"
                    : " text-gray-500 hover:bg-gray-500 hover:text-white",
                    // add custom class name
                    props.className
            )}
        >
            {children}
        </button>
    );
}
