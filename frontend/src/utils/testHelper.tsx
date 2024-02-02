import Provider from '@/components/Provider';
import Wrapper from '@/components/Wrapper';
import i18n from '@/i18n/i18n';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-theme';
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

export function renderThemeProvider(element: ReactElement) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system">
      {element}
    </ThemeProvider>
  );
}

export function renderI18nextProvider(element: ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{element}</I18nextProvider>);
}

export function renderWrapper(element: ReactElement) {
  return render(<Wrapper>{element}</Wrapper>);
}
