import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function AddButton() {
  const { push } = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex w-full cursor-pointer items-center justify-center">
      <div className="flex justify-end">
        <button
          className={`
            h-12 w-[350px] rounded-xl bg-indigo-800 transition-colors
            duration-500 hover:bg-indigo-900 md:w-[700px]
          `}
          onClick={() => push('/transactions')}
        >
          {t('addButton:addTransaction')}
        </button>
      </div>
    </div>
  );
}
