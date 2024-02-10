import Provider from '@/components/Provider';
import i18n from '@/i18n/i18n';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { RecoilRoot } from 'recoil';

export function renderProvider(element: ReactElement) {
  return render(<Provider>{element}</Provider>);
}

export function renderRecoilRoot(element: ReactElement | ReactNode) {
  return render(<RecoilRoot>{element}</RecoilRoot>);
}

export function renderSessionProvider(element: ReactElement) {
  return render(<SessionProvider>{element}</SessionProvider>);
}

export function renderI18nextProvider(element: ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{element}</I18nextProvider>);
}
