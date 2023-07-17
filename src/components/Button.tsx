import { MouseEventHandler } from 'react';

interface ButtonProps {
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
}: ButtonProps) {
  return (
    <button
      className={`
        ${height} ${width}
        ${disabled ? 'bg-slate-400' : 'bg-indigo-800 hover:bg-indigo-900'}
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
