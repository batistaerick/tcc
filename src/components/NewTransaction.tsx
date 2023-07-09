'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import useMonthlyExpenses from '@/hooks/useMonthlyExpenses';
import useMonthlyIncomes from '@/hooks/useMonthlyIncomes';
import usePredictions from '@/hooks/usePrediction';
import { Expense, Income } from '@prisma/client';
import axios from 'axios';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
  FcCalendar,
  FcCurrencyExchange,
  FcIdea,
  FcSurvey,
} from 'react-icons/fc';
import DatePickerDialog from './DatePickerDialog';

interface NewTransactionProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewTransaction({
  isOpen,
  setIsOpen,
}: NewTransactionProps) {
  const { t } = useTranslation();
  const [expenseOrIncomeOption, setExpenseOrIncomeOption] = useState('');
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    amount: 0,
    category: '',
    notes: '',
    userId: '',
  });
  const { mutate: mutateExpense } = useMonthlyExpenses();
  const { mutate: mutateIncome } = useMonthlyIncomes();
  const { mutate: mutatePrediction } = usePredictions();
  const { data: user, mutate: mutateUser } = useCurrentUser();

  useEffect(
    () =>
      setForm((prevFormState) => ({
        ...prevFormState,
        date: date,
      })),
    [date]
  );

  function handleChange({
    target: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  }

  function onSubmit(event: ChangeEvent<HTMLFormElement>): void {
    event.preventDefault();
    handleSubmit(expenseOrIncomeOption).catch((error) => console.error(error));
  }

  async function handleSubmit(route: string): Promise<void> {
    const response: Expense | Income = await axios.post(`/api/${route}`, {
      ...form,
    });

    await mutateUser({
      ...user,
      [route]: response,
    });
    await mutateExpense();
    await mutateIncome();
    await mutatePrediction();
    setDate(new Date());
    setIsOpen(false);
  }

  const isSaveButtonDisabled =
    form.amount === 0 || form.category === '' || expenseOrIncomeOption === '';

  return (
    <>
      {isOpen && (
        <div className="absolute z-20 h-screen w-screen bg-white">
          <div className="h-screen dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div className="ml-5 mt-5 flex items-center gap-2">
                <FcCalendar size={20} />
                <DatePickerDialog date={date} setDate={setDate} />
              </div>
              <AiFillCloseCircle
                className="mr-5 mt-5 cursor-pointer"
                size={30}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <form
              className="mt-5 flex flex-col gap-10"
              id="form"
              onSubmit={onSubmit}
            >
              <div className="grid grid-cols-2 place-items-center">
                <div className="flex flex-row items-center gap-1">
                  <input
                    className="h-5 w-5 accent-indigo-800"
                    id="expense"
                    type="radio"
                    value="expenses"
                    checked={expenseOrIncomeOption === 'expenses'}
                    onChange={({ target: { value } }) =>
                      setExpenseOrIncomeOption(value)
                    }
                  />
                  <label className="text-lg" htmlFor="expense">
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
                    onChange={({ target: { value } }) =>
                      setExpenseOrIncomeOption(value)
                    }
                  />
                  <label className="text-lg" htmlFor="income">
                    {t('newTransaction:incomeOption')}
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <label htmlFor="amount">{t('newTransaction:amount')}</label>
                  <div className="flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-l-lg bg-zinc-300 text-black">
                      <FcCurrencyExchange size={25} />
                    </div>
                    <input
                      className="h-12 w-48 rounded-r-lg bg-zinc-300 text-2xl text-black focus:outline-none"
                      id="amount"
                      type="number"
                      maxLength={13}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <label htmlFor="notes">{t('newTransaction:notes')}</label>
                  <div className="flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-l-lg bg-zinc-300 text-black">
                      <FcSurvey size={25} />
                    </div>
                    <input
                      className="h-12 w-48 rounded-r-lg bg-zinc-300 text-black focus:outline-none"
                      id="notes"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <label htmlFor="category">
                    {t('newTransaction:category')}
                  </label>
                  <div className="flex">
                    <div className="flex h-12 w-12 items-center justify-center rounded-l-lg bg-zinc-300 text-black">
                      <FcIdea size={25} />
                    </div>
                    <input
                      className="h-12 w-48 rounded-r-lg bg-zinc-300 text-black focus:outline-none"
                      id="category"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-col">
                  <button
                    form="form"
                    type="submit"
                    disabled={isSaveButtonDisabled}
                    className={`
                      ${isSaveButtonDisabled ? 'bg-slate-400' : 'bg-indigo-800'}
                      h-12 w-20 rounded-full text-black
                    `}
                  >
                    {t('newTransaction:save')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
