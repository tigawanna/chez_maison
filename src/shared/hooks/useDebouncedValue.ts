import { useEffect, useState } from "react";

export function useDebouncedValue(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);

    useEffect(() => {
        setIsDebouncing(true);

        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsDebouncing(false);
        }, delay);

        return () => {
            clearTimeout(handler);
        }

    }, [value, delay])

    return {value:debouncedValue, isDebouncing}
}
