import DatePickerDialog from '@/components/DatePickerDialog';
import { render } from '@testing-library/react';

describe('DatePickerDialog component', () => {
  it('should renders the date picker with the initial date', () => {
    const setDate = jest.fn();
    const { getByRole } = render(
      <DatePickerDialog date={new Date('2024-05-05')} setDate={setDate} />
    );

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });
});
