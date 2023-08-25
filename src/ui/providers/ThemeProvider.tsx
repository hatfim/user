import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { themeAtom } from '@application/state/ThemeAtom'; // adjust the path as needed

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: 'light' | 'dark' | 'system';
	storageKey?: string;
};

export function ThemeProvider({
	children,
	defaultTheme = 'light',
	storageKey = 'theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useAtom(themeAtom);

	useEffect(() => {
		const storedTheme = localStorage.getItem(storageKey);

		if (storedTheme) {
			setTheme(storedTheme);
		} else {
			setTheme(defaultTheme);
			localStorage.setItem(storageKey, defaultTheme);
		}
	}, [setTheme, storageKey, defaultTheme]);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');

		let appliedTheme = theme;

		if (theme === 'system') {
			appliedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		}

		root.classList.add(appliedTheme);
	}, [theme]);

	return <div {...props}>{children}</div>;
}
