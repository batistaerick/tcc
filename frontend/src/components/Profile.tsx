import Button from '@/components/Button';
import Input from '@/components/Input';
import Language from '@/components/Language';
import { useModal } from '@/components/Modals/ModalContext';
import useProfileImage from '@/hooks/useProfileImage';
import { postFetcher, putFetcher } from '@/libs/fetchers';
import { UpdatedUser } from '@/types/types';
import { arePasswordsEqual, hasValueInside } from '@/utils/checkers';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const newUser: UpdatedUser = {
  firstName: '',
  lastName: '',
  middleName: '',
  password: '',
  confirmPassword: '',
};

export default function Profile() {
  const { data: session, update } = useSession();
  const { data: profileImage, mutate: mutateImage } = useProfileImage();
  const { t } = useTranslation();
  const { push } = useRouter();
  const { openModal } = useModal();
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>(newUser);
  const [updatedImage, setUpdatedImage] = useState<Blob>();
  const [unauthorized, setUnauthorized] = useState<string | undefined>();

  async function onSubmit(event: ChangeEvent<HTMLFormElement>): Promise<void> {
    try {
      const { firstName, lastName, middleName, password, confirmPassword } =
        updatedUser;
      event.preventDefault();
      if (hasValueInside(updatedUser)) {
        if (!arePasswordsEqual(password, confirmPassword)) {
          throw new Error('differentPasswords');
        }
        await putFetcher('/users', {
          firstName,
          lastName,
          middleName,
          password,
        });
      }
      if (updatedImage) {
        await postFetcher(
          '/images',
          { file: updatedImage },
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }
      setUpdatedUser(newUser);
      await update();
      await mutateImage();
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setUnauthorized(error?.response?.data?.errorCode);
      } else {
        openModal();
      }
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
    file && setUpdatedImage(file);
  }

  const isSaveButtonDisabled = useMemo<boolean>(
    () =>
      !arePasswordsEqual(updatedUser.password, updatedUser.confirmPassword) ||
      !hasValueInside({ ...updatedUser, updatedImage }),
    [updatedImage, updatedUser]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="gap-10 space-y-5 sm:flex sm:space-y-0">
        <div className="flex flex-col items-center gap-5">
          <label
            className={`
              ${updatedImage || profileImage ? 'bg-none' : 'bg-slate-400 hover:bg-slate-500'}
              h-40 w-40 cursor-pointer rounded-full
              transition duration-500
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
                className="size-full rounded-full object-cover"
                width={0}
                height={0}
                alt="Choose your image"
              />
            )}
            {!updatedImage && profileImage && (
              <Image
                src={URL.createObjectURL(profileImage)}
                className="size-full rounded-full object-cover"
                width={0}
                height={0}
                alt="Choose your image"
              />
            )}
            {!updatedImage && !profileImage && (
              <span className="flex size-full items-center justify-center">
                Choose your image
              </span>
            )}
          </label>
          <div>
            {session?.user?.firstName && (
              <div>&#128515; {`${t('Hi')}, ${session.user.firstName}!`}</div>
            )}
            <div>{session?.user?.email}</div>
          </div>
          <Language />
        </div>
        <form
          className="flex w-[350px] flex-col gap-5 sm:w-[400px]"
          id="updateUserForm"
          onSubmit={onSubmit}
        >
          <Input
            id="firstName"
            label={t('account:firstName')}
            type="text"
            value={updatedUser?.firstName}
            onChange={handleChange}
          />
          <Input
            id="lastName"
            label={t('account:lastName')}
            type="text"
            value={updatedUser?.lastName}
            onChange={handleChange}
          />
          <Input
            id="middleName"
            label={t('account:middleName')}
            type="text"
            value={updatedUser?.middleName}
            onChange={handleChange}
          />
          <div
            className={`
            ${unauthorized && 'rounded-md border border-red-400'}
          `}
          >
            <Input
              id="password"
              label={t('account:newPassword')}
              type="password"
              value={updatedUser?.password}
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
          <div className="flex w-[350px] items-center justify-center gap-3 sm:w-[400px]">
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
              disabled={isSaveButtonDisabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
