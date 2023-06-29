import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      className="h-12 w-48 rounded-r-lg bg-zinc-300 text-black focus:outline-none"
      id="category"
      form="form"
      onChange={handleChange}
    >
      <option className="bg-zinc-300" value="">
        {t('categoryOption:chooseCategory')}
      </option>
      {renderOption()?.map((option) => (
        <option key={option} className="bg-zinc-300" value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
