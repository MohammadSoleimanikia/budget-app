import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
    key: string,
    defaultValue: T | (() => T),
) {
    const [value, setValue] = useState<T>(() => {
        try {
            const jsonValue = localStorage.getItem(key);

            if (jsonValue !== null) {
                return JSON.parse(jsonValue) as T;
            }

            return typeof defaultValue === "function"
                ? (defaultValue as () => T)()
                : defaultValue;
        } catch {
            return typeof defaultValue === "function"
                ? (defaultValue as () => T)()
                : defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            console.error(`Failed to save ${key} to localStorage`);
        }
    }, [key, value]);

    return [value, setValue] as const;
}
