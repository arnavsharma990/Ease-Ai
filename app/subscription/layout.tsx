import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sukoon AI Premium | Subscription Plans',
  description: 'Unlock ultimate peace of mind with Sukoon AI Premium. Personalized relaxation, expert support, and AI-driven mindfulness tools.',
};

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 