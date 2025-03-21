'use client'

import { signIn } from 'next-auth/react'
import { Button } from "../../../components/ui/button"
import Image from 'next/image'

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Sukoon</h1>
          <p className="text-gray-600 dark:text-gray-300">Your mental wellness companion</p>
        </div>
        
        <Button
          onClick={() => signIn('google', { callbackUrl: '/chat' })}
          className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 py-6"
        >
          <Image
            src="/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2"
          />
          <span>Continue with Google</span>
        </Button>
      </div>
    </div>
  )
} 