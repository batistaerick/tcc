import { ReactElement, ReactNode } from 'react';

export interface DefaultBackgroundProps {
  children: ReactNode | ReactElement;
  style?: string;
}

export default function DefaultBackground({
  children,
  style,
}: Readonly<DefaultBackgroundProps>) {
  return (
    <div
      className={`
        h-screen w-screen bg-[url('/images/HomeBackground.jpg')]
        bg-cover bg-fixed bg-center bg-no-repeat text-gray-300
      `}
    >
      <div className={`${style} h-screen w-screen bg-black bg-opacity-50`}>
        {children}
      </div>
    </div>
  );
}
