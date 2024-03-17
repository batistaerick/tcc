'use client';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import DefaultBackground from '@/components/DefaultBackground';
import Header from '@/components/Header';
import NewTransaction from '@/components/NewTransaction';
import useAnalytics from '@/hooks/useAnalytics';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Analytics() {
  const { t } = useTranslation();
  const { data: analytics } = useAnalytics();
  const [index, setIndex] = useState<number>(0);

  function handleNext() {
    if (analytics) {
      if (index < analytics.length - 1) {
        setIndex((prev) => ++prev);
      }
    }
  }
  function handlePrevious() {
    if (analytics) {
      if (index > 0) {
        setIndex((prev) => --prev);
      } else {
        setIndex(0);
      }
    }
  }

  function handleChange({
    currentTarget: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    // setForm((prevForm) => ({
    //   ...prevForm,
    //   [id]: value,
    // }));
  }

  return (
    <DefaultBackground style="flex flex-col items-center gap-2 pt-2">
      <Header />
      <div className="w-[95%]">
        {analytics && (
          <div className="space-y-2">
            <AnalyticsDashboard
              accessesAmountToday={Object.values(
                analytics[index].accesses
              ).reduce((accumulator, current) => accumulator + current, 0)}
              topCountries={[]}
              accesses={analytics[index].accesses}
              path={analytics[index].path}
            />
            <select
              id="transactionType"
              className={`
                rounded-md border border-neutral-700 bg-neutral-700 p-3
                ${true ? 'text-white' : 'text-zinc-400'}
              `}
              value={''}
              onChange={handleChange}
            >
              <option value="" disabled>
                {t('newTransaction:chooseType')}
              </option>
              <option value="EXPENSE">
                {t('newTransaction:expenseOption')}
              </option>
              <option value="INCOME">{t('newTransaction:incomeOption')}</option>
            </select>
          </div>
        )}
      </div>
      <NewTransaction />
    </DefaultBackground>
  );
}
