'use client';
import Header from '@/components/Header';
import { BarChart, Card } from '@tremor/react';
import { useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';

interface AnalyticsDashboardProps {
  amtVisitorsToday: number;
  topCountries: [string, number][];
  accesses: Map<string, number>;
  path: string;
}

export default function AnalyticsDashboard({
  amtVisitorsToday,
  topCountries,
  accesses,
  path,
}: Readonly<AnalyticsDashboardProps>) {
  const visitors = useMemo(
    () =>
      Object.entries(accesses).map(([key, value]) => ({
        name: key,
        Accesses: value,
      })),
    [accesses]
  );

  return (
    <div className="flex flex-col gap-2">
      <Header />
      <Card className="w-full rounded-xl">
        <p className="text-tremor-default text-dark-tremor-content">
          Path (URL)
        </p>
        <p className="text-3xl font-semibold text-dark-tremor-content-strong">
          {path}
        </p>
      </Card>
      <div className="mx-auto grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        <Card className="w-full rounded-xl">
          <p className="text-tremor-default text-dark-tremor-content">
            Average visitors/day
          </p>
          <p className="text-3xl font-semibold text-dark-tremor-content-strong">
            {Math.floor(amtVisitorsToday / 7)}
          </p>
        </Card>
        <Card className="w-full rounded-xl">
          <p className="text-tremor-default flex items-center gap-2.5 text-dark-tremor-content">
            Visitors today
          </p>
          <p className="text-3xl font-semibold text-dark-tremor-content-strong">
            {amtVisitorsToday}
          </p>
        </Card>
      </div>
      <Card className="flex grid-cols-4 flex-col gap-6 rounded-xl sm:grid">
        <h2 className="sm:left-left w-full text-center text-xl font-semibold text-dark-tremor-content-strong">
          This weeks top visitors:
        </h2>
        <div className="col-span-3 flex flex-wrap items-center justify-between gap-8">
          {topCountries?.map(([countryCode, number]) => {
            return (
              <div
                key={countryCode}
                className="flex items-center gap-3 text-dark-tremor-content-strong"
              >
                <p className="hidden text-tremor-content sm:block">
                  {countryCode}
                </p>
                <ReactCountryFlag
                  className="text-5xl sm:text-3xl"
                  svg
                  countryCode={countryCode}
                />

                <p className="text-tremor-content sm:text-dark-tremor-content-strong">
                  {number}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
      <Card className="rounded-xl">
        <BarChart
          allowDecimals={false}
          showAnimation
          data={visitors?.flat() ?? []}
          categories={['Accesses']}
          index="name"
        />
      </Card>
    </div>
  );
}
