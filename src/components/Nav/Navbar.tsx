'use server'

import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

import { createClient } from '@/utils/supabase/server'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const email = data?.user?.email!
  const isDev = process.env.ROLE_DEV?.split(',').includes(email) || false
  const isOwner = process.env.ROLE_OWNER?.split(',').includes(email) || false
  const isEmployee = process.env.ROLE_EMPLOYEES?.split(',').includes(email) || false

  const header: Header = await getCachedGlobal('header', 1)()

  return (
    <NavbarClient
      header={header}
      isDev={isDev}
      isOwner={isOwner}
      isEmployee={isEmployee}
      userData={data}
    />
  )
}
