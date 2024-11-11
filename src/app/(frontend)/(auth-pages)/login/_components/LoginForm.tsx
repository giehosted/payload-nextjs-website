'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { login } from '../../_utils/authActions'
import SignInWithGoogleButton from './SignInWithGoogleButton'
import { useToast } from '@/components/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, { message: 'Email is too short' })
    .max(50, { message: 'Email is too long' }),
  password: z
    .string()
    .min(2, { message: 'Password is too short' })
    .max(50, { message: 'Password is too long' }),
})

export function LoginForm() {
  const [captchaToken, setCaptchaToken] = useState('')
  const router = useRouter()
  const [formPending, setFormPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const ref = useRef<any>(0)

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setFormPending(true)
    const loginData = await login({ formData: data, captchaToken })
    console.log(loginData)
    if (loginData.error) {
      ref.current?.reset()
      toast({
        title: 'Login Error',
        description: loginData.error,
        variant: 'destructive',
      })
    }
    if (loginData.user) {
      toast({
        title: 'Login Successful',
        // description: `Welcome ${loginData.firstName || loginData?.user.email}!`,
        description: `Welcome ${loginData?.user.email}!`,
      })
      router.push('/')
    }
    setFormPending(false)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          name="email"
                          type="text"
                          placeholder="m@example.com"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            name="password"
                            placeholder="Password"
                            type={showPassword ? 'text' : 'password'}
                            required
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                            {showPassword ? (
                              <Eye
                                className="h-6 w-6"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            ) : (
                              <EyeOff
                                className="h-6 w-6"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center">
                  <Link
                    href="#"
                    onClick={() =>
                      toast({
                        title: 'Password Reset not yet suppored.',
                        description: 'Stay tuned for updates on this feature.',
                      })
                    }
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Turnstile
                ref={ref}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!!}
                onSuccess={(token) => {
                  setCaptchaToken(token)
                }}
              />

              {captchaToken === '' ? (
                <Button
                  type="button"
                  onClick={() => {
                    toast({
                      title: 'Please complete the human verification process.',
                    })
                  }}
                >
                  Sign In
                </Button>
              ) : (
                <Button disabled={formPending || loginForm.formState.isSubmitting} type="submit">
                  {formPending || loginForm.formState.isSubmitting ? (
                    <>
                      <LoaderCircle size={30} strokeWidth={3} className="animate-spin mx-2" />
                      Loading...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              )}
              <SignInWithGoogleButton />
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          {`Don't have an account? `}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
