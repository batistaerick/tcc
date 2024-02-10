'use client';
import i18n from '@/i18n/i18n';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { RecoilRoot } from 'recoil';
import ModalError from './ModalError';

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: Readonly<ProviderProps>) {
  return (
    <SessionProvider>
      <RecoilRoot>
        <I18nextProvider i18n={i18n}>
          <ModalError />
          {children}
        </I18nextProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
