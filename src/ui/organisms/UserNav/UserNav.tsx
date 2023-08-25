import { Link } from 'wouter';

import { cn } from '@lib/utils/ClassMerge';

import { buttonVariants } from '@ui/atoms/Button';
import { Icons } from '@ui/atoms/Icons';
import { ToggleMode } from '@ui/molecules/ToggleMode';

export function UserNav() {
  const links = {
    twitter: 'https://twitter.com/hatfim',
    github: 'https://github.com/hatfim',
    linkedin: 'https://www.linkedin.com/in/hatfim/',
  };
	return (
		<div className="flex h-full items-center justify-end gap-1">
			<nav className="flex items-center">
            <Link
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}
              >
                <Icons.Linkedin className="h-4 w-4" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>
            <Link
              href={links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}
              >
                <Icons.GitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0',
                )}
              >
                <Icons.Twitter className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ToggleMode />
          </nav>
		</div>
	);
}
