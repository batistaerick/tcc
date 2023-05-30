import { ChangeEvent, KeyboardEvent } from 'react';

interface InputProps {
  id: string;
  value: string;
  label: string;
  type?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  value,
  label,
  type,
  onKeyDown,
  onChange,
}: InputProps) {
  return (
    <div className="relative">
      <input
        className={`
          text-md
          peer
          block
          w-full
          appearance-none
          rounded-md
          bg-neutral-700
          px-6
          pb-1
          pt-6
          text-white
          focus:ring-0
        `}
        placeholder=" "
        id={id}
        type={type}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <label
        className={`
          text-md
          absolute
          left-6
          top-4
          z-10
          origin-[0]
          -translate-y-3
          scale-75
          transform
          cursor-text
          text-zinc-400
          duration-150
          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3
          peer-focus:scale-75
        `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
