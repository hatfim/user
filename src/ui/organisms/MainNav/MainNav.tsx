/* eslint-disable jsx-a11y/anchor-is-valid */
import { Events } from '@carbon/icons-react';
import { Link, useLocation } from 'wouter';

import { cn } from '@lib/utils/ClassMerge';

import { links } from './constants';

export function MainNav() {
	const [location] = useLocation();

	return (
		<div className="mr-4 hidden md:flex">
			<Link href="/">
				<a className="mr-6 flex h-12 items-center justify-center text-sm">
					<Events className="m-1 h-8 w-8" />
				</a>
			</Link>
			<nav className="flex items-center space-x-6 text-sm font-medium">
				{links.map((link) => (
					<Link
						key={link.path}
						href={link.path}
						className={cn(
							'transition-colors hover:text-foreground/80',
							location === link.path ? 'text-foreground' : 'text-foreground/60'
						)}
					>
						{link.label}
					</Link>
				))}
			</nav>
		</div>
	);
}
