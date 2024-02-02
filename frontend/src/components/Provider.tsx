'use client';
import i18n from '@/i18n/i18n';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
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
        <ThemeProvider attribute="class" defaultTheme="system">
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
