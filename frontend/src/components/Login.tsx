'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Language from '@/components/Language';
import { useModal } from '@/components/Modals/ModalContext';
import { postFetcher } from '@/libs/fetchers';
import { responseErrorAtom } from '@/recoil/recoilValues';
import { ResponseError } from '@/types/types';
import { isValidEmail } from '@/utils/checkers';
import { signIn } from 'next-auth/react';
import { KeyboardEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useRecoilState } from 'recoil';

export default function Login() {
  const [responseError, setResponseError] = useRecoilState<
    ResponseError | undefined
  >(responseErrorAtom);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [variant, setVariant] = useState<string>('login');
  const { openModal } = useModal();
  const { t } = useTranslation();

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
    if (response?.error) {
      const message = t(`api:${response.error}`);
      setResponseError({ title: 'Invalid Credentials', message });
      openModal();
    }
  }, [email, password, openModal, setResponseError, t]);

  const register = useCallback(async () => {
    try {
      await postFetcher('/users', { email, name, password });
      setVariant('login');
      await login();
    } catch (error: any) {
      setResponseError(error.response.data);
      openModal();
    }
  }, [email, password, name, login, openModal, setResponseError]);

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

  return (
    <div
      className={`
        relative h-screen w-screen
        bg-[url('/images/AuthBackground.jpg')] bg-cover bg-fixed bg-center bg-no-repeat
      `}
    >
      <div
        className={`
          flex h-screen w-screen items-center justify-center
          bg-black bg-opacity-50
        `}
      >
        <div
          className={`
            max-w-md self-center rounded-3xl px-16
            pb-16 pt-5 transition-colors duration-500
            sm:bg-slate-950 sm:bg-opacity-90 lg:mt-2 lg:w-2/5
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
                responseError && 'rounded-md border border-red-400'
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
                responseError && 'rounded-md border border-red-400'
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
              <FaGithub color="black" size={30} />
            </div>
          </div>
          <p className="mt-12 flex items-center justify-center text-neutral-500">
            {variant === 'login'
              ? t('auth:newInHere')
              : t('auth:alreadyHaveAccount')}
            <button
              className="ml-1 cursor-pointer text-white hover:underline"
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
