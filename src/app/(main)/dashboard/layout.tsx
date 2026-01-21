import { ReactNode } from 'react';

import { SiteHeader } from './components/sidebar/site-header';

import { AppSidebar } from '@/app/(main)/dashboard/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface ILayoutProps {
  readonly children: ReactNode;
}

export default async function Layout({ children }: ILayoutProps) {
  const defaultOpen = true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
