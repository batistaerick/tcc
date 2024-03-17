import { ChangeEvent, KeyboardEvent } from 'react';

export interface TextareaProps {
  id: string;
  value: string | number | undefined;
  label: string;
  type: string;
  height?: string;
  width?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  id,
  value,
  label,
  type,
  height,
  width,
  onKeyDown,
  onChange,
}: Readonly<TextareaProps>) {
  function handleKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (
      type === 'number' &&
      !RegExp(/^[\d.]$/).exec(event.key) &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  return (
    <div className="relative">
      <textarea
        className={`
          ${height ?? ''}
          ${width ?? 'w-full'}
          text-md peer block appearance-none rounded-md bg-neutral-700
          px-6 pb-1 pt-6 text-white outline-none focus:ring-0
        `}
        placeholder=" "
        id={id}
        value={value}
        onKeyDown={handleKeyPress}
        onChange={onChange}
      />
      <label
        className={`
          text-md absolute left-6 top-4 origin-[0] -translate-y-3 scale-75 transform
          cursor-text text-zinc-400 duration-150
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3 peer-focus:scale-75
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
