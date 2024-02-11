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
        bg-[url('/images/HomeBackground.jpg')]
        relative h-screen w-screen
        bg-cover bg-fixed bg-center bg-no-repeat
        transition-colors duration-500
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
