import useCurrentUser from '@/hooks/useCurrentUser';
import useProfileImage from '@/hooks/useProfileImage';
import '@/i18n/i18n';
import { putFetcher } from '@/libs/fetchers';
import { UpdatedUserType } from '@/types/types';
import { arePasswordsEqual, hasValueInside } from '@/utils/checkers';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import Input from './Input';
import Language from './Language';

export default function Profile() {
  const { data: session } = useSession();
  const { data: user, mutate: mutateUser } = useCurrentUser();
  const { data: profileImage, mutate: mutateImage } = useProfileImage();
  const { t } = useTranslation();
  const { push } = useRouter();

  const [updatedUser, setUpdatedUser] = useState<UpdatedUserType>({
    username: undefined,
    newPassword: undefined,
    confirmPassword: undefined,
  });
  const [unauthorized, setUnauthorized] = useState<string | undefined>();
  const [updatedImage, setUpdatedImage] = useState<Blob | null>(null);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      if (updatedUser.newPassword !== updatedUser.confirmPassword) {
        throw new Error('differentPasswords');
      }
      if (
        (updatedUser?.confirmPassword &&
          updatedUser.confirmPassword.length > 0) ||
        updatedUser?.username
      ) {
        const newUserData = {
          name: updatedUser?.username,
          password: updatedUser?.confirmPassword,
        };
        await putFetcher(
          '/users',
          newUserData,
          buildHeadersAuthorization(session?.user.accessToken)
        );
      }

      await mutateUser();
      await mutateImage();
      push('/');
    } catch (error: any) {
      setUnauthorized(error?.response?.data ?? error?.message);
    }
  }

  function handleChange({
    currentTarget: { value, id },
  }: ChangeEvent<HTMLInputElement>): void {
    setUpdatedUser((prevUpdatedUser) => ({
      ...prevUpdatedUser,
      [id]: value,
    }));
  }

  function handleChangeImage({
    currentTarget: { files },
  }: ChangeEvent<HTMLInputElement>): void {
    const file = files?.[0];
    if (file) {
      setUpdatedImage(file);
    }
  }

  function isSaveButtonDisabled(): boolean {
    return (
      !arePasswordsEqual(
        updatedUser.newPassword,
        updatedUser.confirmPassword
      ) || !hasValueInside({ ...updatedUser, updatedImage })
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-5">
      <div className="flex items-center justify-center gap-5 text-white">
        <div className="flex flex-col items-center justify-center gap-1">
          <label
            className={`
              cursor-pointer rounded-xl bg-slate-400
              transition duration-500 hover:bg-slate-500
            `}
          >
            <input
              className="hidden"
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleChangeImage}
            />
            {updatedImage && (
              <Image
                src={URL.createObjectURL(updatedImage)}
                className="flex h-32 w-32 items-center rounded-xl object-cover"
                width={0}
                height={0}
                alt="Choose your image"
              />
            )}
            {!updatedImage && profileImage && (
              <Image
                src={`${URL.createObjectURL(profileImage)}`}
                className="flex h-32 w-32 items-center rounded-xl object-cover"
                width={0}
                height={0}
                alt="Choose your image"
              />
            )}
            {!updatedImage && !profileImage && (
              <span className="flex h-32 w-32 items-center rounded-xl">
                Choose your image
              </span>
            )}
          </label>
        </div>
        <div>
          <div>{user?.name}</div>
          <div>{user?.email}</div>
        </div>
      </div>
      <form
        className="flex w-[350px] flex-col gap-5"
        id="updateUserForm"
        onSubmit={onSubmit}
      >
        <Input
          id="username"
          label={t('account:username')}
          type="text"
          value={updatedUser?.username}
          onChange={handleChange}
        />
        <div
          className={`
            ${unauthorized && 'rounded-md border border-red-400'}
          `}
        >
          <Input
            id="newPassword"
            label={t('account:newPassword')}
            type="password"
            value={updatedUser?.newPassword}
            onChange={handleChange}
          />
        </div>
        <div
          className={`
            ${unauthorized && 'rounded-md border border-red-400'}
          `}
        >
          <Input
            id="confirmPassword"
            label={t('account:confirmPassword')}
            type="password"
            value={updatedUser?.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {unauthorized && (
          <div className="text-white">{t(`api:${unauthorized}`)}</div>
        )}
        <div className="flex w-[350px] items-center justify-center gap-3">
          <Button
            type="button"
            height="h-12"
            width="w-full"
            translation={t('newTransaction:cancel')}
            onClick={() => push('/')}
          />
          <Button
            type="submit"
            form="updateUserForm"
            height="h-12"
            width="w-full"
            translation={t('newTransaction:save')}
            disabled={isSaveButtonDisabled()}
          />
        </div>
      </form>
      <Language />
    </div>
  );
}
