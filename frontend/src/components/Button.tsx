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
        ${disabled ? 'bg-slate-700' : 'bg-indigo-800 hover:bg-indigo-900'}
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
