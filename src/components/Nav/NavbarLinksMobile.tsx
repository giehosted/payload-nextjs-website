import { cn } from '@/utilities'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { ChevronsUpDown } from 'lucide-react'

export default function NavbarLinks({
  setMountMobileNav,
  isOwner = false,
  isEmployee = false,
}: {
  setMountMobileNav: React.Dispatch<React.SetStateAction<boolean>>
  isOwner: boolean
  isEmployee: boolean
}) {
  const pathname = usePathname()
  return (
    <>
      <div>
        <Link
          href="/c"
          className={cn(
            'text-xl font-medium text-muted-foreground transition-colors hover:text-foreground p-2',
            pathname === '/c' && 'text-foreground',
          )}
        >
          TFTG Rewards
        </Link>
      </div>
      {isEmployee && (
        <Collapsible>
          <CollapsibleTrigger
            className={cn(
              'flex justify-between text-xl w-full text-left p-2 text-muted-foreground',
              pathname.startsWith('/management') && 'text-foreground',
            )}
          >
            Management
            <ChevronsUpDown />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6">
            <Link
              onClick={() => setMountMobileNav(false)}
              className={cn(
                'flex justify-between w-full text-left p-2 text-muted-foreground',
                pathname.startsWith('/management/inventory') && 'text-foreground',
              )}
              href="/management/inventory"
            >
              Inventory
            </Link>
            <Link
              onClick={() => setMountMobileNav(false)}
              className={cn(
                'flex justify-between w-full text-left p-2 text-muted-foreground',
                pathname.startsWith('/management/sales') && 'text-foreground',
              )}
              href="/management/sales"
            >
              Sales Reports
            </Link>
            <Link
              onClick={() => setMountMobileNav(false)}
              className={cn(
                'flex justify-between w-full text-left p-2 text-muted-foreground',
                pathname.startsWith('/management/rewards') && 'text-foreground',
              )}
              href="/management/rewards"
            >
              Rewards
            </Link>
          </CollapsibleContent>
        </Collapsible>
      )}
      {isOwner && (
        <Collapsible>
          <CollapsibleTrigger
            className={cn(
              'flex justify-between text-xl w-full text-left p-2 text-muted-foreground',
              pathname.startsWith('/admin') && 'text-foreground',
            )}
          >
            Admin
            <ChevronsUpDown />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-6">
            <Link
              onClick={() => setMountMobileNav(false)}
              className={cn(
                'flex justify-between w-full text-left p-2 text-muted-foreground',
                pathname.startsWith('/admin/inventorycms') && 'text-foreground',
              )}
              href="/admin/inventorycms"
            >
              CMS Inventory
            </Link>
          </CollapsibleContent>
        </Collapsible>
      )}
      <div className="mt-auto text-sm">
        <Link
          href="/about/contact-us"
          className="underline dark:text-white"
          onClick={() => setMountMobileNav(false)}
        >
          Contact Us
        </Link>
      </div>
    </>
  )
}
