'use client';
import Input from '@/components/Input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { KeyboardEvent, useCallback, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import wallet from '../../images/wallet.png';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [variant, setVariant] = useState<string>('login');

  const toggleVariant = useCallback(
    () =>
      setVariant((currentVariant) =>
        currentVariant === 'login' ? 'register' : 'login'
      ),
    []
  );

  const login = useCallback(async () => {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    }).catch((error) => console.error(error));
  }, [email, password]);

  const register = useCallback(async () => {
    await axios
      .post('/api/register', {
        email,
        name,
        password,
      })
      .then(login)
      .catch((error) => console.error(error));
  }, [email, password, name, login]);

  function onKeyDown({ key }: KeyboardEvent<HTMLInputElement>) {
    if (key === 'Enter') {
      variant === 'login'
        ? login().catch((error) => console.error(error))
        : register().catch((error) => console.error(error));
    }
  }

  return (
    <div
      className={`
        relative h-screen w-screen
        bg-no-repeat bg-center bg-fixed bg-cover
      `}
    >
      <div className="bg-dark-theme w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-10 flex justify-center items-center">
          <Image src={wallet} alt="Logo" width={48} height={48} />
        </nav>
        <div className="flex justify-center">
          <div
            className={`
              bg-opacity-70 px-16 pb-16 pt-5 self-center mt-2
              lg:w-2/5 lg: max-w-md rounded-md w-full
            `}
          >
            <h2 className="flex justify-center items-center text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Sign up'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="email"
                  label="Username"
                  type="text"
                  value={name}
                  onChange={({ currentTarget: { value } }) => setName(value)}
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={({ currentTarget: { value } }) => setEmail(value)}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={({ currentTarget: { value } }) => setPassword(value)}
                onKeyDown={onKeyDown}
              />
            </div>
            <button
              className="bg-indigo-800 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div
                className={`
                  w-10 h-10 bg-white rounded-full
                  flex items-center justify-center
                  cursor-pointer hover:opacity-80 transition
                `}
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className={`
                  w-10 h-10 bg-white rounded-full
                  flex items-center justify-center
                  cursor-pointer hover:opacity-80 transition
                `}
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="flex justify-center items-center text-neutral-500 mt-12">
              {variant === 'login'
                ? 'New in here?'
                : 'Already have an account?'}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Sign up now.' : 'Login.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
