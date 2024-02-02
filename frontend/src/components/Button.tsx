import { MouseEventHandler } from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  height?: string;
  width?: string;
  disabled?: boolean;
  translation: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  type,
  form,
  height,
  width,
  disabled,
  translation,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`
        rounded-xl text-white transition-colors duration-500
        ${height ?? 'h-10'} ${width ?? 'w-16'}
        ${
          disabled
            ? 'bg-[#568185] dark:bg-slate-700'
            : 'bg-[#78b7bb] hover:bg-[#5e9094] dark:bg-indigo-800 dark:hover:bg-indigo-900'
        }
      `}
      type={type}
      form={form}
      onClick={onClick}
      disabled={disabled}
    >
      {translation}
    </button>
  );
}
