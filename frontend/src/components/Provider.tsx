'use client';
import { ModalProvider } from '@/components/Modals/ModalContext';
import i18n from '@/i18n/i18n';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { RecoilRoot } from 'recoil';

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: Readonly<ProviderProps>) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <I18nextProvider i18n={i18n}>
          <ModalProvider>{children}</ModalProvider>
        </I18nextProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
