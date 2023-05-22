import FinancialMovements from './subcomponents/FinancialMovements';

const expenses = [
  {
    id: '2312322323',
    type: 'Salary',
    value: 2000,
  },
  {
    id: '1222',
    type: 'Vale',
    value: 600,
  },
  {
    id: '33232',
    type: 'Freelances',
    value: 81,
  },
];

export default function Income() {
  return (
    <div>
      <div className="flex justify-between mx-5 overflow-auto">
        <div className="font-semibold text-indigo-600">Income</div>
        <button className="font-semibold text-indigo-600">View all</button>
      </div>
      <div className="h-52 overflow-y-auto">
        {expenses.map((expense) => (
          <FinancialMovements key={expense.id} movements={expense} />
        ))}
      </div>
    </div>
  );
}
