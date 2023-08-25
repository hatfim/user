import { useAtom } from 'jotai';

import { themeAtom } from '@application/state/ThemeAtom';

export const UseTheme = () => {
	const [theme, setTheme] = useAtom(themeAtom);

	const changeTheme = (newTheme: string) => {
		localStorage.setItem('theme', newTheme);
		setTheme(newTheme);
	};

	return {
		theme,
		setTheme: changeTheme,
	};
};
