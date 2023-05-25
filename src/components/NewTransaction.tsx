'use client';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
  FcCalendar,
  FcCurrencyExchange,
  FcIdea,
  FcSurvey,
} from 'react-icons/fc';

interface NewTransactionProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewTransaction({
  isOpen,
  setIsOpen,
}: NewTransactionProps) {
  const [amountOrIncomeOption, setAmountOrIncomeOption] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAmountChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (value === '' || regex.test(value)) {
      setAmount(value);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="absolute h-screen w-screen z-20 bg-white">
          <div className="h-screen dark:bg-dark-theme">
            <div className="flex justify-between items-center">
              <button className="flex items-center gap-2 mt-5 ml-5">
                <FcCalendar size={20} />
                Jan/2023
              </button>
              <AiFillCloseCircle
                className="cursor-pointer mt-5 mr-5"
                size={30}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <form className="flex flex-col gap-10 mt-5" id="form">
              <div className="grid grid-cols-2 place-items-center">
                <div className="flex flex-row items-center gap-1">
                  <input
                    className="accent-indigo-800 w-5 h-5"
                    id="expense"
                    type="radio"
                    value="EXPENSE"
                    checked={amountOrIncomeOption === 'EXPENSE'}
                    onChange={({ target: { value } }) =>
                      setAmountOrIncomeOption(value)
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
                    value="INCOME"
                    checked={amountOrIncomeOption === 'INCOME'}
                    onChange={({ target: { value } }) =>
                      setAmountOrIncomeOption(value)
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
                      type="text"
                      maxLength={13}
                      value={amount}
                      onChange={handleAmountChange}
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
                      value={notes}
                      onChange={({ target: { value } }) => setNotes(value)}
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
                    <select
                      className="w-48 h-12 rounded-r-lg bg-zinc-300 text-black focus:outline-none"
                      id="category"
                      form="form"
                      value={selectedCategory}
                      onChange={({ target: { value } }) => {
                        setSelectedCategory(value);
                      }}
                    >
                      <option value="">Choose a category</option>
                      <option className="bg-zinc-300" value="Food">
                        Food
                      </option>
                      <option className="bg-zinc-300" value="Home">
                        Home
                      </option>
                      <option className="bg-zinc-300" value="Car">
                        Car
                      </option>
                      <option className="bg-zinc-300" value="Motorcycle">
                        Motorcycle
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex flex-col">
                  <button
                    form="form"
                    type="submit"
                    className="bg-indigo-800 text-black h-12 w-20 rounded-full"
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
