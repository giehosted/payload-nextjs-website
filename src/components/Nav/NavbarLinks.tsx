import { usePathname } from 'next/navigation'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/utilities'

export default function NavbarLinks({
  isOwner = false,
  isEmployee = false,
}: {
  isOwner: boolean
  isEmployee: boolean
}) {
  const pathname = usePathname()
  return (
    <>
      {isEmployee && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  'text-xl font-medium bg-transparent text-muted-foreground transition-colors hover:text-foreground p-2',
                  pathname === '/management' && 'text-foreground',
                )}
              >
                Inventory
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col items-center p-2 w-44">
                  <li>
                    <NavigationMenuLink>
                      <a
                        href="/management/inventory"
                        className={cn(
                          'w-full block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        )}
                      >
                        <div className="text-sm font-medium leading-none">Inventory</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Inventory Records Page.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink>
                      <a
                        href="/management/sales"
                        className={cn(
                          'w-full block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        )}
                      >
                        <div className="text-sm font-medium leading-none">Sales Reports</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Sales Reports Page.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink>
                      <a
                        href="/management/rewards"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        )}
                      >
                        <div className="text-sm font-medium leading-none">Rewards</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Rewards Management Page
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
      {isOwner && (
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    'text-xl font-medium bg-transparent text-muted-foreground transition-colors hover:text-foreground p-2',
                    pathname.startsWith('/admin') && 'text-foreground',
                  )}
                >
                  Admin
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col items-center p-2 w-44">
                    <li>
                      <NavigationMenuLink>
                        <a
                          href="/admin/inventorycms"
                          className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                          )}
                        >
                          <div className="text-sm font-medium leading-none">Inventory CMS</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Content Management System for Inventory. Edit products, tabs,
                            categories, and more.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      )}
    </>
  )
}
