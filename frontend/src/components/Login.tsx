'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Language from '@/components/Language';
import Loading from '@/components/Loading';
import { postFetcher } from '@/libs/fetchers';
import { isValidEmail } from '@/utils/checkers';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import wallet from '../../public/images/wallet.png';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [variant, setVariant] = useState<string>('login');
  const [unauthorized, setUnauthorized] = useState<string | undefined | null>();

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
    setUnauthorized(response?.error);
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await postFetcher('/users', { email, name, password });
      setVariant('login');
      await login();
    } catch (error: any) {
      setUnauthorized(error.message);
    }
  }, [email, password, name, login]);

  async function onClick() {
    if (variant === 'login') {
      await login();
    } else {
      await register();
    }
  }

  async function onKeyDown({ key }: KeyboardEvent<HTMLInputElement>) {
    if (key === 'Enter') {
      onClick();
    }
  }

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'authenticated') {
    push('/');
    return <Loading />;
  }
  return (
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
          <h2 className="mb-8 flex items-center justify-center text-4xl font-semibold">
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
                onKeyDown={onKeyDown}
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
                onChange={({ currentTarget: { value } }) => setPassword(value)}
                onKeyDown={onKeyDown}
              />
            </div>
            {unauthorized && <div>{t(`api:${unauthorized}`)}</div>}
          </div>
          <div className="mt-10">
            <Button
              height="h-12"
              width="w-full"
              disabled={!isValidEmail(email) || password.length === 0}
              onClick={onClick}
              translation={
                variant === 'login' ? t('auth:login') : t('auth:signUp')
              }
            />
          </div>
          <div className="mt-8 flex flex-row items-center justify-center gap-4">
            <div
              className={`
                  flex h-10 w-10 cursor-pointer
                  items-center justify-center rounded-full
                  bg-white transition hover:opacity-80
                `}
              // onClick={() => {}}
            >
              <FcGoogle size={30} />
            </div>
            <div
              className={`
                  flex h-10 w-10 cursor-pointer
                  items-center justify-center rounded-full
                  bg-white transition hover:opacity-80
                `}
              // onClick={() => {}}
            >
              <FaGithub size={30} />
            </div>
          </div>
          <p className="mt-12 flex items-center justify-center text-neutral-500">
            {variant === 'login'
              ? t('auth:newInHere')
              : t('auth:alreadyHaveAccount')}
            <button
              className="ml-1 cursor-pointer text-black hover:underline dark:text-white"
              onClick={toggleVariant}
            >
              {variant === 'login' ? t('auth:signUp') : t('auth:login')}
            </button>
          </p>
          <div className="mt-5 flex items-center justify-center">
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
}
