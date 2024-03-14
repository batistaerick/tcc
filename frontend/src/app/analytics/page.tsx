'use client';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Button from '@/components/Button';
import DefaultBackground from '@/components/DefaultBackground';
import Header from '@/components/Header';
import NewTransaction from '@/components/NewTransaction';
import useAnalytics from '@/hooks/useAnalytics';
import { useState } from 'react';

export default function Analytics() {
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
            <div className="flex w-full items-center justify-center gap-2">
              <Button
                height="h-12"
                width="w-3/12"
                translation={'Previous Page'}
                onClick={handlePrevious}
              />
              <Button
                height="h-12"
                width="w-3/12"
                translation={'Next Page'}
                onClick={handleNext}
              />
            </div>
          </div>
        )}
      </div>
      <NewTransaction />
    </DefaultBackground>
  );
}
