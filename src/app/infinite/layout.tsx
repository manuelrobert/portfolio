import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infinite | Libin Mathew',
  description: 'Browse websites infinitely within this page.',
};

export default function ProxyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 