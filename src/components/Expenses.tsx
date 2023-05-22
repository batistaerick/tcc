import FinancialMovements from './subcomponents/FinancialMovements';

const expenses = [
  {
    id: '2312322323',
    type: 'Home',
    value: 425,
  },
  {
    id: '1222',
    type: 'Health',
    value: 116,
  },
  {
    id: '33232',
    type: 'Groceries',
    value: 81,
  },
  {
    id: '65656',
    type: 'Shopping',
    value: 64,
  },
  {
    id: '67676',
    type: 'Eating out',
    value: 325.5,
  },
];

export default function Expenses() {
  return (
    <div>
      <div className="flex justify-between mx-5">
        <div className="font-semibold text-indigo-600">Expenses</div>
        <div className="font-semibold text-indigo-600">View all</div>
      </div>
      <div className="h-52 overflow-auto">
        {expenses.map((expense) => (
          <FinancialMovements key={expense.id} movements={expense} />
        ))}
      </div>
    </div>
  );
}
