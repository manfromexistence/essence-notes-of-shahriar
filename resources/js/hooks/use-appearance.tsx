import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const prefersDark = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    const isDark =
        appearance === 'dark' || (appearance === 'system' && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    // Always use dark theme for admin panel
    applyTheme('dark');
}

export function useAppearance() {
    // Always use dark theme for admin panel
    const [appearance] = useState<Appearance>('dark');

    const updateAppearance = useCallback((_mode: Appearance) => {
        // Theme is locked to dark - do nothing
        applyTheme('dark');
    }, []);

    useEffect(() => {
        // Always apply dark theme
        applyTheme('dark');
        localStorage.setItem('appearance', 'dark');
        setCookie('appearance', 'dark');
    }, []);

    return { appearance, updateAppearance } as const;
}
