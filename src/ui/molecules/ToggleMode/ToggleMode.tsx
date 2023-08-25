'use client';

import { Moon, Sun } from '@carbon/icons-react';

import { UseTheme } from '@application/hooks/UseTheme';

import { Button } from '@ui/atoms/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/molecules/Dropdown';


export function ToggleMode() {
  const { setTheme } = UseTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <Sun data-testid="sun" className="light:block h-[1.5rem] w-[1.3rem] dark:hidden" />
          <Moon data-testid="moon"  className="light:hidden h-5 w-5 dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
