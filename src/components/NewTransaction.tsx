'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import useExpenseList from '@/hooks/useExpenseList';
import useIncomeList from '@/hooks/useIncomeList';
import { Expense, Income } from '@prisma/client';
import axios from 'axios';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
  FcCalendar,
  FcCurrencyExchange,
  FcIdea,
  FcSurvey,
} from 'react-icons/fc';
import CategoryOptions from './CategoryOptions';
import DatePickerDialog from './DatePickerDialog';

interface NewTransactionProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewTransaction({
  isOpen,
  setIsOpen,
}: NewTransactionProps) {
  const [expenseOrIncomeOption, setExpenseOrIncomeOption] = useState('');
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    amount: 0,
    category: '',
    notes: '',
    userId: '',
  });
  const { mutate: mutateExpense } = useExpenseList();
  const { mutate: mutateIncome } = useIncomeList();
  const { data: user, mutate: mutateUser } = useCurrentUser();

  useEffect(() => {
    setForm((prevFormState) => ({
      ...prevFormState,
      date: date,
    }));
  }, [date]);

  function handleChange({
    target: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  }

  function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit(expenseOrIncomeOption).catch((error) => console.error(error));
  }

  async function handleSubmit(route: string) {
    const response: Expense | Income = await axios.post(`/api/${route}`, {
      ...form,
    });

    await mutateUser({
      ...user,
      [route]: response,
    }).catch((error) => console.error(error));

    await mutateExpense().catch((error) => console.error(error));
    await mutateIncome().catch((error) => console.error(error));
    setIsOpen(false);
  }

  const isSaveButtonDisabled =
    form.amount === 0 || form.category === '' || expenseOrIncomeOption === '';

  return (
    <>
      {isOpen && (
        <div className="absolute h-screen w-screen z-20 bg-white">
          <div className="h-screen dark:bg-zinc-900">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mt-5 ml-5">
                <FcCalendar size={20} />
                <DatePickerDialog date={date} setDate={setDate} />
              </div>
              <AiFillCloseCircle
                className="cursor-pointer mt-5 mr-5"
                size={30}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <form
              className="flex flex-col gap-10 mt-5"
              id="form"
              onSubmit={onSubmit}
            >
              <div className="grid grid-cols-2 place-items-center">
                <div className="flex flex-row items-center gap-1">
                  <input
                    className="accent-indigo-800 w-5 h-5"
                    id="expense"
                    type="radio"
                    value="expenses"
                    checked={expenseOrIncomeOption === 'expenses'}
                    onChange={({ target: { value } }) =>
                      setExpenseOrIncomeOption(value)
                    }
                  />
                  <label className="text-lg" htmlFor="expense">
                    Expense
                  </label>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <input
                    className="accent-indigo-800 w-5 h-5"
                    id="income"
                    type="radio"
                    value="incomes"
                    checked={expenseOrIncomeOption === 'incomes'}
                    onChange={({ target: { value } }) =>
                      setExpenseOrIncomeOption(value)
                    }
                  />
                  <label className="text-lg" htmlFor="income">
                    Income
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <label htmlFor="amount">Amount</label>
                  <div className="flex">
                    <div className="flex justify-center items-center h-12 w-12 bg-zinc-300 text-black rounded-l-lg">
                      <FcCurrencyExchange size={25} />
                    </div>
                    <input
                      className="w-48 h-12 text-2xl rounded-r-lg bg-zinc-300 text-black focus:outline-none"
                      id="amount"
                      type="number"
                      maxLength={13}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <label htmlFor="notes">Notes (Optional)</label>
                  <div className="flex">
                    <div className="flex justify-center items-center h-12 w-12 bg-zinc-300 text-black rounded-l-lg">
                      <FcSurvey size={25} />
                    </div>
                    <input
                      className="w-48 h-12 rounded-r-lg bg-zinc-300 text-black focus:outline-none"
                      id="notes"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <label htmlFor="category">Category</label>
                  <div className="flex">
                    <div className="flex justify-center items-center h-12 w-12 bg-zinc-300 text-black rounded-l-lg">
                      <FcIdea size={25} />
                    </div>
                    <CategoryOptions
                      category={expenseOrIncomeOption}
                      expenseOptions={user.expenseOptions}
                      incomeOptions={user.incomeOptions}
                      handleChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <button
                    form="form"
                    type="submit"
                    disabled={isSaveButtonDisabled}
                    className={`
                      ${isSaveButtonDisabled ? 'bg-slate-400' : 'bg-indigo-800'}
                      text-black h-12 w-20 rounded-full
                    `}
                  >
                    Save
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
