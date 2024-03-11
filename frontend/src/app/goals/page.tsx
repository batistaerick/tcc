'use client';
import DefaultBackground from '@/components/DefaultBackground';
import Goals from '@/components/Goals';
import Header from '@/components/Header';
import NewTransaction from '@/components/NewTransaction';

export default function GoalsPage() {
  return (
    <DefaultBackground>
      <Header />
      <Goals />
      <NewTransaction />
    </DefaultBackground>
  );
}
