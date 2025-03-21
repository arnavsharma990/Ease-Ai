import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sukoon AI Premium | Subscription Plans',
  description: 'Unlock ultimate peace of mind with Sukoon AI Premium. Personalized relaxation, expert support, and AI-driven mindfulness tools.',
};

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      {/* Simple gradient background */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-purple-50/90 via-purple-100/50 to-violet-50/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 -z-10"
        aria-hidden="true"
      />
      {children}
    </div>
  )
} 