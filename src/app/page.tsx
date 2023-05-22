import AddButton from '@/components/AddButton';
import Balance from '@/components/Balance';
import Expenses from '@/components/Expenses';
import Header from '@/components/Header';
import Income from '@/components/Income';
import SpendStatus from '@/components/SpendStatus';

export default function Home() {
  return (
    <div className="flex flex-col h-screen dark:bg-dark-theme dark:text-gray-300">
      <Header />
      <Balance />
      <SpendStatus />
      <Expenses />
      <Income />
      <AddButton />
    </div>
  );
}
