'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from "../../../components/ui/button"
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Error</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {error === 'Configuration' && 'There is a problem with the server configuration.'}
          {error === 'AccessDenied' && 'You do not have permission to sign in.'}
          {error === 'Verification' && 'The sign in link is no longer valid.'}
          {!error && 'An unknown error occurred during authentication.'}
        </p>
        <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
} 