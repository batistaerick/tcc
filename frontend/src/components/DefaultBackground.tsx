import { ReactNode } from 'react';

export interface DefaultBackgroundProps {
  children: ReactNode;
}

export default function DefaultBackground({
  children,
}: Readonly<DefaultBackgroundProps>) {
  return (
    <div
      className={`
        flex h-screen w-screen flex-col items-center gap-2 bg-white
        transition-colors duration-500 dark:bg-slate-800 dark:text-gray-300
      `}
    >
      {children}
    </div>
  );
}
