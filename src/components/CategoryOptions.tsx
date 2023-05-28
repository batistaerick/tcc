import { ChangeEvent } from 'react';

interface CategoryOptionsProps {
  category: string;
  expenseOptions: string[];
  incomeOptions: string[];
  handleChange: ({
    target: { value, id },
  }: ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategoryOptions({
  category,
  expenseOptions,
  incomeOptions,
  handleChange,
}: CategoryOptionsProps) {
  function renderOption() {
    if (category === 'expenses') {
      return expenseOptions;
    }
    if (category === 'incomes') {
      return incomeOptions;
    }
  }

  return (
    <select
      className="w-48 h-12 rounded-r-lg bg-zinc-300 text-black focus:outline-none"
      id="category"
      form="form"
      onChange={handleChange}
    >
      <option className="bg-zinc-300" value="">
        Choose a category
      </option>
      {renderOption()?.map((option) => (
        <option key={option} className="bg-zinc-300" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
