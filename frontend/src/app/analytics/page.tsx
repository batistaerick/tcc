'use client';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import Button from '@/components/Button';
import DefaultBackground from '@/components/DefaultBackground';
import useAnalytics from '@/hooks/useAnalytics';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Analytics() {
  const { t } = useTranslation();
  const { data: analytics } = useAnalytics();
  const [index, setIndex] = useState<number>(0);

  function handleClick() {
    if (analytics) {
      if (index < analytics.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        setIndex(0);
      }
    }
  }

  return (
    <DefaultBackground>
      {analytics && (
        <>
          <div>Path: {analytics[index].path}</div>
          <AnalyticsDashboard
            amtVisitorsToday={Object.values(analytics[index].accesses).reduce(
              (accumulator, current) => accumulator + current,
              0
            )}
            topCountries={[]}
            accesses={analytics[index].accesses}
          />
          <Button
            height="h-12"
            width="w-3/12"
            translation={'Next Page'}
            onClick={handleClick}
          />
        </>
      )}
    </DefaultBackground>
  );
}
