import usePredictions from '@/hooks/usePrediction';
import '@/i18n/i18n';
import { postFetcher } from '@/libs/fetchers';
import { Transaction } from '@/types/types';
import { buildHeadersAuthorization } from '@/utils/headerToken';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FcCalendar,
  FcCurrencyExchange,
  FcIdea,
  FcSurvey,
} from 'react-icons/fc';
import { KeyedMutator } from 'swr';
import Button from './Button';
import DatePickerDialog from './DatePickerDialog';
import Input from './Input';
import Language from './Language';

interface NewTransactionProps {
  transaction: Transaction;
  mutation?: KeyedMutator<Transaction>;
}

export default function NewTransaction({
  transaction,
  mutation,
}: Readonly<NewTransactionProps>) {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { mutate: predictionMutate } = usePredictions();
  const [form, setForm] = useState<Transaction>(transaction);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    await postFetcher<Transaction>(
      '/transactions',
      form,
      buildHeadersAuthorization(session?.user.accessToken)
    );
    await predictionMutate();
    mutation?.();
    push('/');
  }

  function handleChange({
    currentTarget: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  }

  function handleChangeDate(date: Date | ((currVal: Date) => Date)) {
    setForm((prevFormState) => ({
      ...prevFormState,
      date: typeof date === 'function' ? date(form.date ?? new Date()) : date,
    }));
  }

  return (
    <div className="h-screen w-screen bg-slate-800">
      <div className="flex flex-col items-center justify-center">
        <div className="z-20 mt-5 flex w-[320px] items-center gap-1 md:w-[450px]">
          <FcCalendar size={20} />
          <DatePickerDialog
            date={form?.date ?? new Date()}
            setDate={handleChangeDate}
          />
        </div>
        <form
          className="mt-5 flex w-[320px] flex-col gap-10 md:w-[450px]"
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
            <FcSurvey className="mb-1" size={25} />
            <Input
              id="notes"
              label={t('newTransaction:notes')}
              type="text"
              value={form?.notes}
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
          <div className="flex items-center justify-between">
            <label
              className="text-base text-zinc-300"
              htmlFor="transactionType"
            >
              {t('newTransaction:transactionType')}
            </label>
            <select
              id="transactionType"
              className={`rounded-md border border-neutral-700 bg-neutral-700 p-3
              ${form.transactionType ? 'text-white' : 'text-zinc-400'}
            `}
              value={form.transactionType ?? ''}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t('newTransaction:chooseType')}
              </option>
              <option value="EXPENSE">
                {t('newTransaction:expenseOption')}
              </option>
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
        <div className="mt-10">
          <Language />
        </div>
      </div>
    </div>
  );
}
