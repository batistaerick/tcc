import Button from '@/components/Button';
import DefaultBackground from '@/components/DefaultBackground';
import { useRouter } from 'next/navigation';

interface DefaultErrorPageProps {
  reset: () => void;
}

export default function DefaultErrorPage({
  reset,
}: Readonly<DefaultErrorPageProps>) {
  const { push } = useRouter();

  return (
    <DefaultBackground>
      <h1 className="mb-4 text-6xl font-bold">Oops &#128531;</h1>
      <p className="mb-8 text-xl">Something went wrong.</p>
      <div className="flex w-44 gap-3">
        <Button
          height="h-12"
          width="w-10/12"
          translation="Go to Home"
          onClick={() => push('/')}
        />
        <Button
          height="h-12"
          width="w-10/12"
          translation="Try Again"
          onClick={reset}
        />
      </div>
    </DefaultBackground>
  );
}
