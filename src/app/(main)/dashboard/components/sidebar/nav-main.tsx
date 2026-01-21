'use client';

import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  type INavGroup,
  type INavMainItem,
  type INavSubItem,
} from '@/navigation/sidebar/sidebar-items';

interface INavMainProps {
  items: INavGroup[];
}

const IsComingSoon = () => (
  <span className="ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800">Soon</span>
);

const RenderSubItems = ({ subItems }: { subItems: INavSubItem[] }) => {
  const path = usePathname();

  const isActive = (url: string) => path === url || path.startsWith(url);

  const hasActiveNestedItem = (items?: INavSubItem[]): boolean => {
    if (!items) return false;
    return items.some((item) => isActive(item.url as string) || hasActiveNestedItem(item.subItems));
  };

  return (
    <SidebarMenuSub>
      {subItems.map((subItem) => (
        <SidebarMenuSubItem key={subItem.title}>
          {subItem.subItems ? (
            <Collapsible asChild defaultOpen={hasActiveNestedItem(subItem.subItems)}>
              <div>
                <CollapsibleTrigger className="group/trigger w-full" asChild>
                  <SidebarMenuSubButton
                    isActive={
                      isActive(subItem.url as string) || hasActiveNestedItem(subItem.subItems)
                    }
                  >
                    {subItem.icon && <Icon icon={subItem.icon} />}
                    <span>{subItem.title}</span>
                    {subItem.comingSoon && <IsComingSoon />}
                    <Icon
                      icon="mdi:chevron-right"
                      className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90"
                    />
                  </SidebarMenuSubButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <RenderSubItems subItems={subItem.subItems} />
                </CollapsibleContent>
              </div>
            </Collapsible>
          ) : (
            <SidebarMenuButton
              asChild
              isActive={isActive(subItem.url as string)}
              aria-disabled={subItem.comingSoon}
            >
              <Link href={subItem.url as string}>
                {subItem.icon && <Icon icon={subItem.icon} />}
                <span>{subItem.title}</span>
                {subItem.comingSoon && <IsComingSoon />}
              </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
};

export function NavMain({ items }: INavMainProps) {
  const path = usePathname();

  const isActiveRecursive = (item: INavMainItem | INavSubItem): boolean => {
    if (path === item.url) return true;

    if (item.subItems?.length) {
      return item.subItems.some((sub) => isActiveRecursive(sub));
    }

    return false;
  };

  const isItemActive = (item: INavMainItem): boolean => {
    return isActiveRecursive(item);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                asChild
                tooltip="Dashboard"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              >
                <Link href="/dashboard">
                  <Icon icon="mdi:view-dashboard" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {items.map((group) => (
        <SidebarGroup key={group.id}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {group.items.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isItemActive(item)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      {item.subItems ? (
                        <SidebarMenuButton
                          disabled={item.comingSoon}
                          isActive={isItemActive(item)}
                          tooltip={item.title}
                        >
                          {item.icon && <Icon icon={item.icon} />}
                          <span>{item.title}</span>
                          {item.comingSoon && <IsComingSoon />}

                          <Icon
                            icon="mdi:chevron-right"
                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                          />
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          aria-disabled={item.comingSoon}
                          isActive={isItemActive(item)}
                          tooltip={item.title}
                        >
                          {item.url ? (
                            <Link href={item.url}>
                              {item.icon && <Icon icon={item.icon} />}
                              <span>{item.title}</span>
                              {item.comingSoon && <IsComingSoon />}
                            </Link>
                          ) : (
                            <>
                              {item.icon && <Icon icon={item.icon} />}
                              <span>{item.title}</span>
                              {item.comingSoon && <IsComingSoon />}
                            </>
                          )}
                        </SidebarMenuButton>
                      )}
                    </CollapsibleTrigger>

                    {item.subItems && (
                      <CollapsibleContent>
                        <RenderSubItems subItems={item.subItems} />
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
