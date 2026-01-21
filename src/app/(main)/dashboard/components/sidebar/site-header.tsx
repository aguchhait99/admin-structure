'use client';

import { Icon } from '@iconify-icon/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { mediaUrl } from '@/api/endpoints/endpoints';
import { ModeToggle } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

export function SiteHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleMyProfile = () => {};

  const handleOpenCommandMenu = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2">
        <Button
          variant="outline"
          className="text-muted-foreground w-60 justify-start font-normal"
          onClick={handleOpenCommandMenu}
        >
          <Icon icon="lucide:command" className="mr-2 h-4 w-4" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="text-muted-foreground pointer-events-none ml-auto rounded border px-1.5 py-0.5 text-xs">
            ⌘K
          </kbd>
        </Button>
        <div className="ml-auto flex items-center gap-2">
          {/* Search Trigger */}

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative h-10 w-10 overflow-hidden rounded-full border hover:opacity-90">
                <Image
                  src={mediaUrl(user?.profileImage || '')}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <div className="bg-muted relative h-10 w-10 overflow-hidden rounded-full border">
                    <Image
                      src={mediaUrl(user?.profileImage || '')}
                      alt="User Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{user?.fullName}</p>
                    <p className="text-muted-foreground text-xs">{user?.role?.roleDisplayName}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                <Icon icon="mdi:account" className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <Icon icon="mdi:logout" className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
