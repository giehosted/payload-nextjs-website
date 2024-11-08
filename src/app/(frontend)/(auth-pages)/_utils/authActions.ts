'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login({
  formData,
  captchaToken,
}: {
  formData: { email: string; password: string }
  captchaToken: string
}) {
  const supabase = await createClient()
  const signinData = {
    email: formData.email,
    password: formData.password,
    options: { captchaToken },
  }
  const { data, error } = await supabase.auth.signInWithPassword(signinData)
  revalidatePath('/', 'layout')
  return { ...data, error: error?.message }
  /* const userDB: Tuser | undefined = data?.user?.email
    ? (await getUserDB({ email: data.user.email }))?.[0]
    : undefined
  return { ...data, firstName: userDB?.firstName, error: error?.message } */
}

export async function signup({
  formData,
  captchaToken,
}: {
  formData: { email: string; password: string }
  captchaToken: string
}) {
  const supabase = await createClient()
  const signupData = {
    email: formData.email,
    password: formData.password,
    options: { captchaToken },
  }
  const { data, error } = await supabase.auth.signUp(signupData)
  revalidatePath('/', 'layout')
  return { ...data, error: error?.message }
}

export async function signout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
    return false
  }
  return true
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://tastesftg.com/auth/callback',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.log(error)
    redirect('/error')
  }

  redirect(data.url)
}

/* export async function deleteUser(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.admin.deleteUser(id)
  const deleteUserDBRes = data.user?.email ? (await deleteUserDB(data.user.email))?.[0] : undefined
  return { data, error, deleteUserDBRes }
} */
