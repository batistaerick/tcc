'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Money from '@/components/Money';
import { TransactionType } from '@/enums/enums';
import useMonthlySummary from '@/hooks/useMonthlySummary';
import useTransactions from '@/hooks/useTransactions';
import { postFetcher, putFetcher } from '@/libs/fetchers';
import {
  goalFormAtom,
  responseErrorAtom,
  selectedDateAtom,
} from '@/recoil/recoilValues';
import { Goal, PaginatedTransactions } from '@/types/types';
import { expenseColors, getProgressColor, incomeColors } from '@/utils/colors';
import { formatBarChart, formatCurrency } from '@/utils/globalFormats';
import { BarChart, DonutChart, Legend, ProgressCircle } from '@tremor/react';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import {
  FcClapperboard,
  FcCurrencyExchange,
  FcStatistics,
} from 'react-icons/fc';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { useModal } from './Modals/ModalContext';
import Textarea from './Textarea';

export default function Goals() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { data: monthlySummary } = useMonthlySummary();
  const { data: incomes, mutate: incomesMutate } = useTransactions(
    TransactionType.INCOME
  );
  const { data: expenses, mutate: expensesMutate } = useTransactions(
    TransactionType.EXPENSE
  );
  const { openModal } = useModal();
  const date = useRecoilValue<Date>(selectedDateAtom);
  const resetUpdateGoal = useResetRecoilState(goalFormAtom);
  const setResponseError = useSetRecoilState(responseErrorAtom);
  const [form, setForm] = useRecoilState(goalFormAtom);
  const [isUpdateGoalOpen, setIsUpdateGoalOpen] = useState<boolean>(false);

  const incomesDataChart = useMemo(() => buildChartData(incomes), [incomes]);
  const expensesDataChart = useMemo(() => buildChartData(expenses), [expenses]);
  const percentage = useMemo(() => {
    if (form?.currentlyAmount && form?.targetAmount) {
      return Number(
        (
          ((form?.currentlyAmount ?? 0) / (form?.targetAmount ?? 0)) *
          100
        )?.toFixed(0) ?? 0
      );
    }
    return 0;
  }, [form?.currentlyAmount, form?.targetAmount]);

  function buildChartData(transactions: PaginatedTransactions[] | undefined) {
    return (
      transactions?.[0].content
        .map((transaction) => ({
          name: transaction.category,
          value: transaction.value,
          category: transaction.category,
        }))
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0)) ?? []
    );
  }

  const onSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        if (form?.id) {
          await putFetcher<Goal>('/goals', form);
        } else {
          await postFetcher<Goal>('/goals', form);
        }
        await incomesMutate();
        await expensesMutate();
        setIsUpdateGoalOpen((prev) => !prev);
        resetUpdateGoal();
      } catch (error: any) {
        setResponseError(error?.response?.data);
        openModal();
      }
    },
    [
      expensesMutate,
      form,
      incomesMutate,
      openModal,
      resetUpdateGoal,
      setResponseError,
    ]
  );

  function handleChange({
    currentTarget: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  }

  return (
    <div className="flex w-[95%] flex-col items-center justify-center gap-2">
      <div
        className={`
          flex h-52 w-full cursor-default flex-col gap-2
          rounded-xl bg-slate-800 bg-opacity-50 p-3
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            {t('balance:currentlyAmount')}
            <div className="flex items-center justify-center gap-1">
              <Money className="text-3xl" value={form?.currentlyAmount ?? 0} />
              <BiEdit
                className="cursor-pointer text-slate-400 transition-colors duration-500 hover:text-slate-100"
                size={30}
                onClick={() => setIsUpdateGoalOpen(!isUpdateGoalOpen)}
              />
            </div>
          </div>
          <div
            className={`
              flex max-h-52 max-w-96 flex-col items-center justify-center
            `}
          >
            <div className="text-lg">{form?.title}</div>
            <div className="overflow-y-auto break-words">
              {form?.description}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center gap-5 space-y-3">
              <ProgressCircle
                value={percentage}
                size="lg"
                color={getProgressColor(percentage)}
              >
                <div className="flex flex-col text-center text-sm">
                  <span>Progress</span>
                  <span>{percentage}%</span>
                </div>
              </ProgressCircle>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`
          sm:pace-y-2 min-h-64 w-full items-center justify-around
          rounded-xl bg-slate-800 bg-opacity-50 py-2 sm:flex sm:space-x-2
        `}
      >
        <div className="flex w-full flex-col items-center gap-3">
          <div>
            {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)}
          </div>
          <DonutChart
            variant="donut"
            data={incomesDataChart}
            colors={incomeColors}
            valueFormatter={(value: number) =>
              formatCurrency(value, language) ?? ''
            }
          />
          <Legend
            className="w-2/3 overflow-y-auto"
            colors={incomeColors}
            categories={incomesDataChart.map((expense) => expense.category)}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-3">
          <div>
            {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)}
          </div>
          <DonutChart
            variant="donut"
            data={expensesDataChart}
            colors={expenseColors}
            valueFormatter={(value: number) =>
              formatCurrency(value, language) ?? ''
            }
          />
          <Legend
            className="w-2/3 overflow-y-auto"
            colors={expenseColors}
            categories={expensesDataChart.map((expense) => expense.category)}
          />
        </div>
      </div>
      <div className="w-full gap-2 rounded-xl bg-slate-800 bg-opacity-50 py-2 sm:flex">
        <div className="sm:w-1/2"></div>
        <div className="sm:w-1/2">
          <BarChart
            data={
              monthlySummary?.map((month) => {
                const date = formatBarChart(Number(month.date.split('-')[0]));
                return { ...month, date };
              }) ?? []
            }
            index="date"
            categories={['income', 'expense']}
            colors={['emerald', 'red']}
          />
        </div>
      </div>
      {isUpdateGoalOpen && (
        <div
          className={`
            absolute flex h-full w-full items-center justify-center
            bg-black bg-opacity-80 backdrop-blur-sm
          `}
        >
          <div className="flex w-11/12 flex-col gap-2 md:w-6/12">
            <form
              className="flex w-full flex-col gap-5 rounded-lg bg-slate-700 bg-opacity-50 p-5"
              id="updateGoalForm"
              onSubmit={onSubmit}
            >
              <div className="">Update Goal</div>
              <div>
                <FcCurrencyExchange className="mb-1" size={25} />
                <Input
                  id="amount"
                  label={t('goals:newAmount')}
                  type="number"
                  value={0}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FcClapperboard className="mb-1" size={25} />
                <Input
                  id="title"
                  label={t('goals:title')}
                  type="text"
                  value={form?.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FcStatistics className="mb-1" size={25} />
                <Textarea
                  id="description"
                  label={t('goals:description')}
                  type="text"
                  height="h-32"
                  value={form?.description}
                  onChange={handleChange}
                />
              </div>
            </form>
            <div className="flex w-full items-center justify-center gap-2">
              <Button
                type="button"
                height="h-12"
                width="w-full"
                translation={t('newTransaction:cancel')}
                onClick={() => setIsUpdateGoalOpen(!isUpdateGoalOpen)}
              />
              <Button
                type="submit"
                form="updateGoalForm"
                height="h-12"
                width="w-full"
                translation={t('newTransaction:save')}
                disabled
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
