interface FinancialMovementsProps {
  movements: { type: string; value: number };
}

export default function FinancialMovements({
  movements,
}: FinancialMovementsProps) {
  return (
    <div className="flex justify-between items-center mx-5 my-5 border-b-2 border-gray-500">
      <div>{movements.type}</div>
      <div>${movements.value.toFixed(2)}</div>
    </div>
  );
}
