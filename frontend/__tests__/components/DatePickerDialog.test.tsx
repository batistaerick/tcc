import DatePickerDialog from '@/components/DatePickerDialog';
import { render } from '@testing-library/react';

describe('DatePickerDialog component', () => {
  it('should renders the date picker with the initial date', () => {
    const setDate = jest.fn();
    const { getByDisplayValue } = render(
      <DatePickerDialog date={new Date('2022-01-01')} setDate={setDate} />
    );

    const inputElement = getByDisplayValue('31/December/2021'); // Update the expected date format

    expect(inputElement).toBeInTheDocument();
  });
});
