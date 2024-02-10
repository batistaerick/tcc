import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { PiEyeDuotone, PiEyeSlashDuotone } from 'react-icons/pi';

export interface InputProps {
  id: string;
  value: string | number | undefined;
  label: string;
  type: string;
  accept?: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  value,
  label,
  type,
  accept,
  onKeyDown,
  onChange,
}: Readonly<InputProps>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const EyeIcon = isPasswordVisible ? PiEyeDuotone : PiEyeSlashDuotone;

  function handleType() {
    if (type === 'password' && isPasswordVisible) {
      return 'text';
    }
    return type;
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
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
          outline-none
          focus:ring-0
        `}
        placeholder=" "
        id={id}
        type={handleType()}
        value={value}
        accept={accept}
        onKeyDown={handleKeyPress}
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
      {type === 'password' && (
        <div className="absolute right-3 top-4">
          <EyeIcon
            className="cursor-pointer text-gray-950"
            size={22}
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </div>
      )}
    </div>
  );
}
