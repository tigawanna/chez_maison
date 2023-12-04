import { useEffect, useState } from 'react';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';
// import { useLocalStoreValues } from "./../store";

export const useDarkTheme = () => {
    const [theme, setTheme] = useState<"light"|"dark">(localStorage.theme ?? 'dark');
    // //no-console("theme in hook=== ",theme)
    useEffect(() => {
        const colorTheme = theme === 'dark' ? 'light' : 'dark';
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        if (theme) {
            root.classList.add(theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);
    const nextTheme = theme === "dark" ? "light" : "dark";
    const modeIcon = theme === "dark" ? BsSunFill : BsFillMoonFill;
    const toggleTheme = () => {setTheme(nextTheme) };
    return { theme, toggleTheme,modeIcon };
};





