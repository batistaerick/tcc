interface FinancialMovementsProps {
  category: string;
  amount: number;
}

export default function FinancialMovements({
  category,
  amount,
}: FinancialMovementsProps) {
  return (
    <div className="flex justify-between items-center mx-5 my-5 border-b-2 border-gray-500">
      <div>{category}</div>
      <div>${amount?.toFixed(2)}</div>
    </div>
  );
}
