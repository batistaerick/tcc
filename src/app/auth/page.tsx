'use client';
import Input from '@/components/Input';
import Language from '@/components/Language';
import Loading from '@/components/Loading';
import '@/i18n/i18n';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import wallet from '../../../public/images/wallet.png';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [variant, setVariant] = useState<string>('login');
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  const { t } = useTranslation();
  const { push } = useRouter();
  const { status } = useSession();

  const toggleVariant = useCallback(
    () =>
      setVariant((currentVariant) =>
        currentVariant === 'login' ? 'register' : 'login'
      ),
    []
  );

  const login = useCallback(async () => {
    const response = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: false,
    });
    setUnauthorized(response?.error === 'Error');
    setTimeout(() => setUnauthorized(false), 15000);
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

  function isValidEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'authenticated') {
    push('/');
    return <Loading />;
  }
  return (
    <div
      className={`
        relative h-screen w-screen
        bg-zinc-900 bg-cover bg-fixed bg-center bg-no-repeat 
      `}
    >
      <div className="h-full w-full lg:bg-opacity-50">
        <nav className="flex items-center justify-center py-10">
          <Image src={wallet} alt="Logo" width={48} height={48} />
        </nav>
        <div className="flex justify-center">
          <div
            className={`
              w-full max-w-md self-center rounded-md bg-opacity-70
              px-16 pb-16 pt-5 lg:mt-2 lg:w-2/5
            `}
          >
            <h2 className="mb-8 flex items-center justify-center text-4xl font-semibold text-white">
              {variant === 'login' ? t('auth:signIn') : t('auth:signUp')}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="email"
                  label={t('auth:username')}
                  type="text"
                  value={name}
                  onChange={({ currentTarget: { value } }) => setName(value)}
                />
              )}
              <div
                className={`${
                  unauthorized && 'rounded-md border border-red-400'
                }`}
              >
                <Input
                  id="email"
                  label={t('auth:email')}
                  type="email"
                  value={email}
                  onChange={({ currentTarget: { value } }) => setEmail(value)}
                />
              </div>
              <div
                className={`${
                  unauthorized && 'rounded-md border border-red-400'
                }`}
              >
                <Input
                  id="password"
                  label={t('auth:password')}
                  type="password"
                  value={password}
                  onChange={({ currentTarget: { value } }) =>
                    setPassword(value)
                  }
                  onKeyDown={onKeyDown}
                />
              </div>
              {unauthorized && (
                <div className="text-white">
                  {unauthorized && t('api:authorize:wrongCredentials')}
                </div>
              )}
            </div>
            <button
              className={`
                mt-10 w-full rounded-md py-3 text-white
                transition duration-500
                ${
                  email && isValidEmail()
                    ? 'bg-indigo-800 hover:bg-indigo-900'
                    : 'bg-indigo-500'
                }
              `}
              onClick={variant === 'login' ? login : register}
              disabled={email === '' && password === ''}
            >
              {variant === 'login' ? t('auth:login') : t('auth:signUp')}
            </button>
            <div className="mt-8 flex flex-row items-center justify-center gap-4">
              <div
                className={`
                  flex h-10 w-10 cursor-pointer
                  items-center justify-center rounded-full
                  bg-white transition hover:opacity-80
                `}
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className={`
                  flex h-10 w-10 cursor-pointer
                  items-center justify-center rounded-full
                  bg-white transition hover:opacity-80
                `}
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="mt-12 flex items-center justify-center text-neutral-500">
              {variant === 'login'
                ? t('auth:newInHere')
                : t('auth:alreadyHaveAccount')}
              <span
                className="ml-1 cursor-pointer text-white hover:underline"
                onClick={toggleVariant}
              >
                {variant === 'login' ? t('auth:signUp') : t('auth:login')}
              </span>
            </p>
            <div className="mt-5 flex items-center justify-center">
              <Language />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
