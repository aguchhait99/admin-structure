'use client';

import { Icon } from '@iconify-icon/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface ICardHeaderProps {
  title: string;
  children?: React.ReactNode;
  addButtonLabel?: string;
  addButtonUrl?: string;
  button?: boolean;
  backButton?: boolean;

  icon?: string;
}

export function PageCardHeader({
  title,
  children,
  addButtonLabel = 'Add Item',
  addButtonUrl,

  backButton = false,

  icon = 'tabler:plus',
}: ICardHeaderProps) {
  const router = useRouter();

  const onBack = () => router.back();

  return (
    <div className="bg-transparent">
      <div className="flex flex-row items-center justify-between py-2">
        <div className="flex items-center gap-2">
          {backButton && (
            <Button
              variant="outline"
              className="flex items-center justify-center"
              size="icon"
              onClick={onBack}
            >
              <Icon icon="mdi:arrow-left" />
            </Button>
          )}
          <div className="text-xl font-semibold">{title}</div>
        </div>

        <Button variant="outline" size="sm" onClick={() => router.push(addButtonUrl || '')}>
          <Icon icon={icon} className="mr-2 h-4 w-4" />
          <span className="hidden md:inline">{addButtonLabel}</span>
        </Button>
        {children}
      </div>
    </div>
  );
}
