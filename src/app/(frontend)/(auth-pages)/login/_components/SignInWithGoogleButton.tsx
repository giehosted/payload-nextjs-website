'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { signInWithGoogle } from '../../_utils/authActions'

export default function SignInWithGoogleButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => {
        signInWithGoogle()
      }}
    >
      Login with Google
    </Button>
  )
}
