import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  data.user?.email && redirect('/')
  console.log(data.user?.role)

  return <>{children}</>
}
