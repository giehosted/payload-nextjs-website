'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  header: Header
}

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import AuthButtonClient from './AuthButtonClient'
import { useEffect, useState } from 'react'
import NavbarLinks from './NavbarLinks'
import NavbarLinksMobile from './NavbarLinksMobile'
import { User } from '@supabase/auth-js/dist/module/lib/types'
// import { ThemeSwitcher } from './ThemeSwitcher'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export default function NavbarClient({
  header,
  userData,
  isDev,
  isOwner,
  isEmployee,
}: {
  header: Header
  userData: { user: User | null }
  isDev: boolean
  isOwner: boolean
  isEmployee: boolean
}) {
  const pathname = usePathname()
  const [mountMobileNav, setMountMobileNav] = useState(false)

  const userEmail = userData.user?.email

  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const plNavLinks = header.navItems || []

  return (
    <header
      className="z-50 backdrop-blur-md sticky w-full top-0 flex h-20 items-center gap-4 px-4 md:px-10"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <nav className="w-full hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-base lg:gap-6">
        <Link href="/" className="w-16">
          <img
            src="https://cdn.jsdelivr.net/gh/ryangco/tftg-rewards-public/logo/66kblogo.png"
            className="h-16"
            alt="TFTG Logo"
          />
          <span className="sr-only">Tastes From The Greens</span>
        </Link>
        <Link
          href="/"
          className={cn(
            'text-xl font-medium text-muted-foreground transition-colors hover:text-foreground p-2',
            pathname === '/' && 'text-foreground',
          )}
        >
          Home
        </Link>
        {plNavLinks.map(({ link }, i) => (
          <Link
            key={i}
            href={link.url || '/'}
            className={cn(
              'text-xl font-medium text-muted-foreground transition-colors hover:text-foreground p-2',
              pathname === link.url && 'text-foreground',
            )}
          >
            {link.label}
          </Link>
        ))}
        <NavbarLinks isOwner={isOwner} isEmployee={isEmployee} />
      </nav>
      <div className="grid grid-cols-3 md:flex items-center justify-center w-full">
        <Drawer direction="left" open={mountMobileNav} onOpenChange={setMountMobileNav}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="flex flex-col w-full sm-max-w-lg text-black">
            <DrawerTitle className="sr-only">TFTG Concepcion, Camiling, Capas</DrawerTitle>
            <DrawerDescription className="sr-only">Website Mobile Navbar</DrawerDescription>
            <nav className="min-h-screen flex flex-col gap-8 p-4 text-lg font-medium">
              <div className="flex items-center h-16 pr-2.5">
                <Button
                  variant="ghost"
                  className="ml-auto mr-4 h-7 w-7 flex-shrink-0"
                  onClick={() => setMountMobileNav(false)}
                >
                  <X className="ml-auto h-7 w-7 flex-shrink-0 text-primary group-hover:text-gray-200" />
                </Button>
              </div>
              <div className="flex">
                <Link onClick={() => setMountMobileNav(false)} href="/">
                  <img
                    src="https://cdn.jsdelivr.net/gh/ryangco/tftg-rewards-public/logo/66kblogo.png"
                    className="h-40"
                    alt="TFTG Logo"
                  />
                  <span className="sr-only">Tastes From The Greens</span>
                </Link>
              </div>
              <Link
                onClick={() => setMountMobileNav(false)}
                href="/"
                className={cn(
                  'text-xl font-medium text-muted-foreground transition-colors hover:text-foreground p-2',
                  pathname === '/' && 'text-foreground',
                )}
              >
                Home
              </Link>
              <NavbarLinksMobile
                isOwner={isOwner}
                isEmployee={isEmployee}
                setMountMobileNav={setMountMobileNav}
              />
            </nav>
          </DrawerContent>
        </Drawer>
        <Link href="/" className="md:hidden m-auto">
          <img
            src="https://cdn.jsdelivr.net/gh/ryangco/tftg-rewards-public/logo/66kblogo.png"
            className="h-16"
            alt="TFTG Logo"
          />
          <span className="sr-only">Tastes From The Greens</span>
        </Link>
        <div className="col-span-1 text-xs ml-auto flex flex-row justify-center items-center gap-2">
          {userEmail ? (
            <>
              <p className="hidden sm:block">{userEmail?.split('@')[0]}</p>
              <AuthButtonClient isDev={isDev} email={userEmail} />
            </>
          ) : (
            <Link className={buttonVariants({ variant: 'secondary' })} href="/login">
              Login
            </Link>
          )}
          {/* <ThemeSwitcher /> */}
          <ThemeSelector />
        </div>
      </div>
    </header>
  )
}
