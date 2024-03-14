import { ElementRef, ReactNode, useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

interface DropdownProps {
  dropdownItems: { label: ReactNode; onClick: () => void }[];
}

export default function Dropdown({ dropdownItems }: Readonly<DropdownProps>) {
  const dropdownRef = useRef<ElementRef<'div'>>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside.bind(null));
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside.bind(null));
    };
  }, [isOpen]);

  function handleClick(onClick: () => void) {
    setIsOpen(!isOpen);
    onClick();
  }

  return (
    <div ref={dropdownRef} className="space-y-1">
      <button
        id="dropdownDefaultButton"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          inline-flex h-10 w-12 items-center justify-center rounded-lg
          bg-indigo-800 bg-opacity-60 text-center text-sm font-medium text-white
          hover:bg-indigo-900 focus:ring-2 focus:ring-blue-800
        `}
        type="button"
      >
        <GiHamburgerMenu size={20} />
      </button>
      <div
        id="dropdown"
        className={`
          ${isOpen ? 'block' : 'hidden'}
          absolute z-40 w-44 divide-y
          divide-gray-100 rounded-lg bg-gray-700 shadow
        `}
      >
        <ul
          className="text-sm text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropdownItems.map((item, index) => (
            <li key={`${index + Math.random()}`}>
              <button
                className={`
                  block w-full rounded-lg px-4 py-2 text-left
                  hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white
                `}
                onClick={() => handleClick(item.onClick)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
