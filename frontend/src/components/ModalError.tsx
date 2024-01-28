import Button from '@/components/Button';
import { isOpenModalAtom, responseErrorAtom } from '@/recoil/recoilValues';
import { ResponseError } from '@/types/types';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

export default function ModalError() {
  const [responseError, setResponseError] = useRecoilState<
    ResponseError | undefined
  >(responseErrorAtom);
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenModalAtom);
  const { t } = useTranslation();

  function onClose() {
    setResponseError(undefined);
    setIsOpen(false);
  }

  return (
    <div
      className={`
        ${isOpen ? 'visible' : 'invisible'} 
        fixed inset-0 z-50 flex items-center justify-center
        bg-black bg-opacity-25 backdrop-blur-sm
      `}
    >
      <div className="flex w-96 flex-col gap-3 rounded bg-white p-2">
        <h1 className="text-2xl font-semibold">{t('api:error')}</h1>
        <h2 className="text-xl">
          {responseError?.title ?? 'Internal Server Error'}
        </h2>
        <p className="text-red-500">
          {responseError?.message ??
            'An unknown error ocurred, please try again.'}
        </p>
        <Button
          height="h-10"
          width="w-full"
          translation="Close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
