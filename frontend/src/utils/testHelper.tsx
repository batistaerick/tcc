import Provider from '@/components/Provider';
import '@/i18n/i18n';
import { render } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

export function recoilRootRender(element: ReactElement | ReactNode) {
  return render(<RecoilRoot>{element}</RecoilRoot>);
}

export function providerRender(element: ReactElement) {
  return render(<Provider>{element}</Provider>);
}

export function recoilRootProviderRender(element: ReactElement) {
  return render(
    <RecoilRoot>
      <Provider>{element}</Provider>
    </RecoilRoot>
  );
}
