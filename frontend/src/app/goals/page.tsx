'use client';
import DefaultBackground from '@/components/DefaultBackground';
import Goals from '@/components/Goals';
import Header from '@/components/Header';
import NewTransaction from '@/components/NewTransaction';

export default function GoalsPage() {
  return (
    <DefaultBackground style="flex flex-col items-center gap-2 pt-2">
      <Header />
      <Goals />
      <NewTransaction />
    </DefaultBackground>
  );
}
