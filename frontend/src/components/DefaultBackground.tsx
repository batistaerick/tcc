import { ReactElement, ReactNode } from 'react';

export interface DefaultBackgroundProps {
  children: ReactNode | ReactElement;
}

export default function DefaultBackground({
  children,
}: Readonly<DefaultBackgroundProps>) {
  return (
    <div
      className={`
        relative h-screen w-screen bg-[url('/images/HomeBackground.jpg')]
        bg-cover bg-fixed bg-center bg-no-repeat
      `}
    >
      <div
        className={`
          flex h-screen w-screen flex-col items-center justify-center gap-2
          bg-black bg-opacity-50 text-gray-300
        `}
      >
        {children}
      </div>
    </div>
  );
}
