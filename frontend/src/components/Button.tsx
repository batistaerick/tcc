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
  height = 'h-10',
  width = 'w-16',
  disabled,
  translation,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`
        ${height} ${width}
        ${
          disabled
            ? 'dark:bg-slate-700'
            : 'bg-slate-500 hover:bg-slate-600 dark:bg-indigo-800 dark:hover:bg-indigo-900'
        }
        rounded-xl transition-colors duration-500
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
