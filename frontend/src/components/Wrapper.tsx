import DefaultBackground from '@/components/DefaultBackground';
import Loading from '@/components/Loading';
import ModalError from '@/components/ModalError';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface WrapperProps {
  children: ReactNode | ReactElement;
}

export default function Wrapper({ children }: Readonly<WrapperProps>) {
  const { push } = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      push('/auth');
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }
  return (
    <RecoilRoot>
      <ModalError />
      <DefaultBackground>{children}</DefaultBackground>
    </RecoilRoot>
  );
}
