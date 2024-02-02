'use client';
import { useTheme } from 'next-themes';
import { FaSun } from 'react-icons/fa';
import { GiMoonBats } from 'react-icons/gi';

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      {resolvedTheme === 'dark' && (
        <FaSun
          className="cursor-pointer"
          color="orange"
          size={30}
          onClick={() => setTheme('light')}
        />
      )}
      {resolvedTheme === 'light' && (
        <GiMoonBats
          className="cursor-pointer"
          size={30}
          onClick={() => setTheme('dark')}
        />
      )}
    </>
  );
}
