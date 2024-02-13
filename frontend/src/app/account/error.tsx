'use client';
import DefaultErrorPage from '@/components/DefaultErrorPage';

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return <DefaultErrorPage reset={reset} />;
}
