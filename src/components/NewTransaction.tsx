'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePredictions from '@/hooks/usePrediction';
import '@/i18n/i18n';
import { selectedDateAtom } from '@/recoil/datePickerDialog';
import { FormType } from '@/types/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FcCalendar,
  FcCurrencyExchange,
  FcIdea,
  FcSurvey,
} from 'react-icons/fc';
import { useRecoilState } from 'recoil';
import Button from './Button';
import DatePickerDialog from './DatePickerDialog';
import Input from './Input';
import Language from './Language';

export default function NewTransaction() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);
  const [expenseOrIncomeOption, setExpenseOrIncomeOption] =
    useState<string>('');
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [form, setForm] = useState<FormType>({
    amount: '',
    category: '',
    notes: '',
    date: selectedDate,
    type: '',
    userId: '',
  });

  const { push } = useRouter();
  const { t } = useTranslation();
  const { mutate: mutatePrediction } = usePredictions();
  const { data: user, mutate: mutateUser } = useCurrentUser();

  useEffect(
    () =>
      setForm((prevFormState) => ({
        ...prevFormState,
        date: selectedDate,
        type: expenseOrIncomeOption,
      })),
    [selectedDate, expenseOrIncomeOption]
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

  async function handleSubmit() {
    const { data } = await axios.post(
      `/api/${isFixed ? 'fixed-' : ''}transactions`,
      { ...form }
    );

    const type = checkType();

    await mutateUser({
      ...user,
      [type]: [...user[type], data],
    });
    await mutatePrediction();
  }

  function checkType() {
    if (form.type === 'expense') {
      if (isFixed) {
        return 'fixedExpenses';
      }
      return 'expenses';
    }
    if (form.type === 'income') {
      if (isFixed) {
        return 'fixedIncomes';
      }
    }
    return 'incomes';
  }

  const isSaveButtonDisabled = useMemo(
    () =>
      form.amount === 0 || form.category === '' || expenseOrIncomeOption === '',
    [expenseOrIncomeOption, form.amount, form.category]
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="z-20 mt-5 flex w-[320px] items-center justify-end gap-1 md:w-[450px]">
        <FcCalendar size={20} />
        <DatePickerDialog date={selectedDate} setDate={setSelectedDate} />
      </div>
      <form
        className="mt-5 flex w-[320px] flex-col gap-10 md:w-[450px]"
        id="form"
        onSubmit={onSubmit}
      >
        <div className="mt-4 flex items-center gap-14">
          <div className="flex flex-row items-center gap-1">
            <input
              className="h-5 w-5 accent-indigo-800"
              id="expenses"
              type="radio"
              value="expense"
              checked={expenseOrIncomeOption === 'expense'}
              onChange={({ currentTarget: { value } }) =>
                setExpenseOrIncomeOption(value)
              }
            />
            <label className="text-lg text-white" htmlFor="expenses">
              {t('newTransaction:expenseOption')}
            </label>
          </div>
          <div className="flex flex-row items-center gap-1">
            <input
              className="h-5 w-5 accent-indigo-800"
              id="incomes"
              type="radio"
              value="income"
              checked={expenseOrIncomeOption === 'income'}
              onChange={({ currentTarget: { value } }) =>
                setExpenseOrIncomeOption(value)
              }
            />
            <label className="text-lg text-white" htmlFor="incomes">
              {t('newTransaction:incomeOption')}
            </label>
          </div>
        </div>
        <div>
          <FcCurrencyExchange className="mb-1" size={25} />
          <Input
            key="Testing"
            id="amount"
            label={t('newTransaction:amount')}
            type="number"
            value={form.amount}
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
            onChange={({ currentTarget: { checked } }) => setIsFixed(checked)}
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
            form="form"
            height="h-12"
            width="w-full"
            translation={t('newTransaction:save')}
            disabled={isSaveButtonDisabled}
          />
        </div>
      </form>
      <div className="mt-10">
        <Language />
      </div>
    </div>
  );
}
