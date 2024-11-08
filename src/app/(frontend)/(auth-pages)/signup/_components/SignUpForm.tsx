'use client'

import { Turnstile } from '@marsidev/react-turnstile'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signup } from '../../_utils/authActions'
import SignInWithGoogleButton from '../../login/_components/SignInWithGoogleButton'
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
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

const signupSchema = z.object({
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

export function SignUpForm() {
  const [captchaToken, setCaptchaToken] = useState('')
  const [mountCheckEmail, setMountCheckEmail] = useState(false)
  const [signupResEmail, setSignupResEmail] = useState('')
  const [formPending, setFormPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setFormPending(true)
    const signupRes = await signup({
      formData: data,
      captchaToken: captchaToken,
    })
    signupRes.error &&
      toast({
        title: 'Sign Up Error',
        description: signupRes.error,
        variant: 'destructive',
      })
    if (signupRes.user?.email) {
      setSignupResEmail(signupRes.user.email)
      setMountCheckEmail(true)
      toast({
        title: 'Please check your email for confirmation link.',
        description: 'If you do not receive an email, please check your spam folder.',
      })
    }
    setFormPending(false)
  }

  return !mountCheckEmail ? (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signupForm}>
          <form onSubmit={signupForm.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name="email"
                          id="email"
                          type="email"
                          placeholder="milkteaislife@example.com"
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
                  control={signupForm.control}
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
              </div>

              <Turnstile
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
                      title: 'Human Verification Failed',
                      description:
                        'Please complete the verification step to make sure you are not an A.I.',
                      variant: 'destructive',
                    })
                  }}
                >
                  Create an account
                </Button>
              ) : (
                <Button
                  disabled={formPending || signupForm.formState.isSubmitting}
                  type="submit"
                  className="w-full"
                >
                  {formPending || signupForm.formState.isSubmitting ? (
                    <>
                      <LoaderCircle size={30} strokeWidth={3} className="animate-spin mx-2" />
                      Processing...
                    </>
                  ) : (
                    'Create an account'
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
        <div className="m-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
        <SignInWithGoogleButton />
      </CardContent>
    </Card>
  ) : (
    <Card className="mx-auto max-w-sm flex flex-col items-center">
      <CardHeader>
        <CardTitle className="text-xl text-center">Check your email</CardTitle>
        <CardDescription>We just sent a verification link to {signupResEmail}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/login" className="underline">
          Go to Login
        </Link>
      </CardContent>
    </Card>
  )
}
