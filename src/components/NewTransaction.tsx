'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import useMonthlyTransactions from '@/hooks/useMonthlyTransactions';
import usePredictions from '@/hooks/usePrediction';
import '@/i18n/i18n';
import { Expense, FixedExpense, FixedIncome, Income } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
  FcCalendar,
  FcCurrencyExchange,
  FcIdea,
  FcSurvey,
} from 'react-icons/fc';
import DatePickerDialog from './DatePickerDialog';
import Input from './Input';

export default function NewTransaction() {
  const [expenseOrIncomeOption, setExpenseOrIncomeOption] =
    useState<string>('');
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [form, setForm] = useState({
    amount: undefined,
    category: '',
    notes: '',
    type: '',
    userId: '',
  });

  const { push } = useRouter();
  const { t } = useTranslation();
  const { mutate: mutateTransactions } = useMonthlyTransactions();
  const { mutate: mutatePrediction } = usePredictions();
  const { data: user, mutate: mutateUser } = useCurrentUser();

  useEffect(
    () =>
      setForm((prevFormState) => ({
        ...prevFormState,
        date: date,
        type: expenseOrIncomeOption,
      })),
    [date, expenseOrIncomeOption]
  );

  function handleChange({
    currentTarget: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  }

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    await handleSubmit();
    push('/');
  }

  async function handleSubmit(): Promise<void> {
    if (isFixed) {
      const response: FixedExpense | FixedIncome = await axios.post(
        `/api/fixed-transactions`,
        { ...form }
      );

      const fixed =
        expenseOrIncomeOption === 'incomes' ? 'fixedIncomes' : 'fixedExpenses';

      await mutateUser({
        ...user,
        [fixed]: response,
      });
    } else {
      const response: Expense | Income = await axios.post('/api/transactions', {
        ...form,
      });

      await mutateUser({
        ...user,
        [expenseOrIncomeOption]: response,
      });
    }

    await mutateTransactions();
    await mutatePrediction();

    setDate(new Date());
  }

  const isSaveButtonDisabled =
    form.amount === 0 || form.category === '' || expenseOrIncomeOption === '';

  return (
    <div className="h-screen w-screen bg-zinc-900">
      <div className="flex items-center justify-between">
        <div className="ml-5 mt-5 flex items-center gap-2">
          <FcCalendar size={20} />
          <DatePickerDialog date={date} setDate={setDate} />
        </div>
        <AiFillCloseCircle
          className="mr-5 mt-5 cursor-pointer text-white"
          size={30}
          onClick={() => push('/')}
        />
      </div>
      <form className="mt-5 flex flex-col gap-10" id="form" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 place-items-center">
          <div className="flex flex-row items-center gap-1">
            <input
              className="h-5 w-5 accent-indigo-800"
              id="expense"
              type="radio"
              value="expenses"
              checked={expenseOrIncomeOption === 'expenses'}
              onChange={({ currentTarget: { value } }) =>
                setExpenseOrIncomeOption(value)
              }
            />
            <label className="text-lg text-white" htmlFor="expense">
              {t('newTransaction:expenseOption')}
            </label>
          </div>
          <div className="flex flex-row items-center gap-1">
            <input
              className="h-5 w-5 accent-indigo-800"
              id="income"
              type="radio"
              value="incomes"
              checked={expenseOrIncomeOption === 'incomes'}
              onChange={({ currentTarget: { value } }) =>
                setExpenseOrIncomeOption(value)
              }
            />
            <label className="text-lg text-white" htmlFor="income">
              {t('newTransaction:incomeOption')}
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <FcCurrencyExchange className="mb-1" size={25} />
            <Input
              id="amount"
              label={t('newTransaction:amount')}
              type="number"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
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
        </div>
        <div className="flex items-center justify-center">
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
        </div>
        <div className="flex items-center justify-center gap-1">
          <input
            className=""
            id="fixed"
            type="checkbox"
            checked={isFixed}
            onChange={({ currentTarget: { checked } }) => setIsFixed(checked)}
          />
          <label className="text-white" htmlFor="fixed">
            {t('newTransaction:fixed')}
          </label>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col">
            <button
              form="form"
              type="submit"
              disabled={isSaveButtonDisabled}
              className={`
                  h-12 w-20 rounded-full text-black
                  ${isSaveButtonDisabled ? 'bg-slate-400' : 'bg-indigo-800'}
                `}
            >
              {t('newTransaction:save')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
