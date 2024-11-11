'use client'

import { CircleUser } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/hooks/use-toast'
import { signout } from '@/app/(frontend)/(auth-pages)/_utils/authActions'

export default function AuthButtonClient({
  email,
  isDev = false,
}: {
  email: string | undefined
  isDev: boolean
}) {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{(email && email.split('@')[0]) || 'My Account'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* {isDev && (
          <>
            <DropdownMenuItem onClick={tester}>Dev Tester</DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )} */}
        <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        {email ? (
          <DropdownMenuItem
            onClick={async () => {
              ;(await signout())
                ? toast({ title: 'Logged out' })
                : toast({ title: 'Error logging out' })
              router.push('/')
            }}
          >
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => router.push('/login')}>Login</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
