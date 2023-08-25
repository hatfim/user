import { MainNav } from '@ui/organisms/MainNav';
import { UserNav } from '@ui/organisms/UserNav';

export const Header = () => {
	return (
		<header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
			<div className="container flex h-14 items-center p-8">
				<MainNav />
				<div className="ml-auto flex items-center space-x-4">
					<UserNav />
				</div>
			</div>
		</header>
	);
};
