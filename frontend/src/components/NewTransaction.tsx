import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { useModal } from '@/components/Modals/ModalContext';
import usePredictions from '@/hooks/usePrediction';
import { getFetcher, postFetcher, putFetcher } from '@/libs/fetchers';
import { responseErrorAtom, selectedDateAtom } from '@/recoil/recoilValues';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FcCurrencyExchange, FcIdea, FcSurvey } from 'react-icons/fc';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export interface NewTransactionProps {
  id?: string;
}

export default function NewTransaction({ id }: Readonly<NewTransactionProps>) {
  const date = useRecoilValue(selectedDateAtom);
  const setResponseError = useSetRecoilState(responseErrorAtom);
  const { openModal } = useModal();
  const { push } = useRouter();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { mutate: predictionMutate } = usePredictions();
  const [form, setForm] = useState<Transaction>({
    id: '',
    user: undefined,
    value: 0,
    category: '',
    notes: '',
    date: date,
    transactionType: undefined,
  });

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      date,
    }));
  }, [date]);

  useEffect(() => {
    if (id) {
      async function getTransaction() {
        const transaction = await getFetcher<Transaction>(
          `/transactions/${id}`,
          buildHeadersAuthorization(session?.user.accessToken)
        );
        setForm(transaction);
      }
      getTransaction();
    }
  }, [id, session?.user.accessToken]);

  const onSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        if (id) {
          await putFetcher<Transaction>(
            '/transactions',
            form,
            buildHeadersAuthorization(session?.user.accessToken)
          );
        } else {
          await postFetcher<Transaction>(
            '/transactions',
            form,
            buildHeadersAuthorization(session?.user.accessToken)
          );
        }
        await predictionMutate();
        push('/');
      } catch (error: any) {
        setResponseError(error?.response?.data);
        openModal();
      }
    },
    [
      form,
      id,
      predictionMutate,
      push,
      session?.user.accessToken,
      openModal,
      setResponseError,
    ]
  );

  function handleChange({
    currentTarget: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  }

  return (
    <div className="flex w-11/12 flex-col items-center justify-center md:w-8/12 lg:w-6/12">
      <div className="w-full">
        <Header />
      </div>
      <form
        className="mt-5 flex w-full flex-col gap-10"
        id="newTransactionForm"
        onSubmit={onSubmit}
      >
        <div>
          <FcCurrencyExchange className="mb-1" size={25} />
          <Input
            id="value"
            label={t('newTransaction:value')}
            type="number"
            value={form.value}
            onChange={handleChange}
          />
        </div>
        <div>
          <FcIdea className="mb-1" size={25} />
          <Input
            id="category"
            label={t('newTransaction:category')}
            type="text"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <FcSurvey className="mb-1" size={25} />
          <Input
            id="notes"
            label={t('newTransaction:notes')}
            type="text"
            value={form?.notes}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-zinc-300" htmlFor="transactionType">
            {t('newTransaction:transactionType')}
          </label>
          <select
            id="transactionType"
            className={`
              rounded-md border border-neutral-700 bg-neutral-700 p-3
              ${form.transactionType ? 'text-white' : 'text-zinc-400'}
            `}
            value={form?.transactionType ?? ''}
            onChange={handleChange}
          >
            <option value="" disabled>
              {t('newTransaction:chooseType')}
            </option>
            <option value="EXPENSE">{t('newTransaction:expenseOption')}</option>
            <option value="INCOME">{t('newTransaction:incomeOption')}</option>
            <option value="FIXED_EXPENSE">
              {t('newTransaction:fixedExpenseOption')}
            </option>
            <option value="FIXED_INCOME">
              {t('newTransaction:fixedIncomeOption')}
            </option>
          </select>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            height="h-12"
            width="w-full"
            translation={t('newTransaction:cancel')}
            onClick={() => push('/')}
          />
          <Button
            type="submit"
            form="newTransactionForm"
            height="h-12"
            width="w-full"
            translation={t('newTransaction:save')}
            disabled={
              form.value === 0 ||
              form.category === '' ||
              form.transactionType === undefined
            }
          />
        </div>
      </form>
    </div>
  );
}
