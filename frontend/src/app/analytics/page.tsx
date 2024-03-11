'use client';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Button from '@/components/Button';
import DefaultBackground from '@/components/DefaultBackground';
import useAnalytics from '@/hooks/useAnalytics';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Analytics() {
  const { t } = useTranslation();
  const { push } = useRouter();
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
    <DefaultBackground>
      {analytics && (
        <>
          <AnalyticsDashboard
            amtVisitorsToday={Object.values(analytics[index].accesses).reduce(
              (accumulator, current) => accumulator + current,
              0
            )}
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
        </>
      )}
    </DefaultBackground>
  );
}
