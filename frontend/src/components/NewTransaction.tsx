'use client';
import { TransactionType } from '@/enums/enums';
import usePredictions from '@/hooks/usePrediction';
import useTransactions from '@/hooks/useTransactions';
import '@/i18n/i18n';
import { postFetcher } from '@/libs/fetchers';
import { NewTransactionFormType, Transaction } from '@/types/types';
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
import Button from './Button';
import DatePickerDialog from './DatePickerDialog';
import Input from './Input';
import Language from './Language';

export default function NewTransaction() {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const { mutate: predictionMutate } = usePredictions();
  const { data: transactions, mutate: transactionsMutate } = useTransactions();

  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [form, setForm] = useState<NewTransactionFormType>({
    value: undefined,
    category: '',
    notes: '',
    date: new Date(),
    transactionType: undefined,
  });

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const config = buildHeadersAuthorization(session?.user.accessToken);
    if (isFixed) {
      setForm((prevForm) => ({ ...prevForm, date: null }));
    }

    const transaction = await postFetcher<Transaction>(
      '/transactions',
      { ...form, user: undefined, id: undefined },
      config
    );

    await transactionsMutate(transactions?.concat(transaction));
    await predictionMutate();
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

  function handleChangeFixed(checked: boolean) {
    if (checked) {
      if (
        form.transactionType === TransactionType.EXPENSE ||
        form.transactionType === TransactionType.FIXED_EXPENSE
      ) {
        setForm((prevForm) => ({
          ...prevForm,
          transactionType: TransactionType.FIXED_EXPENSE,
          date: null,
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          transactionType: TransactionType.FIXED_INCOME,
          date: null,
        }));
      }
    }
    if (!checked) {
      if (
        form.transactionType === TransactionType.EXPENSE ||
        form.transactionType === TransactionType.FIXED_EXPENSE
      ) {
        setForm((prevForm) => ({
          ...prevForm,
          transactionType: TransactionType.EXPENSE,
          date: null,
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          transactionType: TransactionType.INCOME,
          date: null,
        }));
      }
    }
    setIsFixed(checked);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="z-20 mt-5 flex w-[320px] items-center gap-1 md:w-[450px]">
        <FcCalendar size={20} />
        <DatePickerDialog
          date={form.date ?? new Date()}
          setDate={handleChangeDate}
        />
      </div>
      <form
        className="mt-5 flex w-[320px] flex-col gap-10 md:w-[450px]"
        id="newTransactionForm"
        onSubmit={onSubmit}
      >
        <div className="mt-4 flex items-center gap-14">
          <div className="flex flex-row items-center gap-1">
            <input
              className="h-5 w-5 accent-indigo-800"
              id="transactionType"
              type="radio"
              value="EXPENSE"
              checked={form.transactionType === 'EXPENSE'}
              onChange={handleChange}
            />
            <label className="text-lg text-white" htmlFor="expenses">
              {t('newTransaction:expenseOption')}
            </label>
          </div>
          <div className="flex flex-row items-center gap-1">
            <input
              className="h-5 w-5 accent-indigo-800"
              id="transactionType"
              type="radio"
              value="INCOME"
              checked={form.transactionType === 'INCOME'}
              onChange={handleChange}
            />
            <label className="text-lg text-white" htmlFor="incomes">
              {t('newTransaction:incomeOption')}
            </label>
          </div>
        </div>
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
            value={form.notes}
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
        <div className="flex items-center justify-center gap-1">
          <input
            id="fixed"
            type="checkbox"
            checked={isFixed}
            onChange={({ currentTarget: { checked } }) =>
              handleChangeFixed(checked)
            }
          />
          <label className="text-white" htmlFor="fixed">
            {t('newTransaction:fixed')}
          </label>
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
  );
}
