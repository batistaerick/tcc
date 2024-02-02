import DatePickerDialog from '@/components/DatePickerDialog';
import i18n from '@/i18n/i18n';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';

describe('DatePickerDialog component', () => {
  it('should renders the date picker with the initial date', () => {
    const setDate = jest.fn();
    const { getByRole } = render(
      <I18nextProvider i18n={i18n}>
        <DatePickerDialog date={new Date('2024-05-05')} setDate={setDate} />
      </I18nextProvider>
    );

    const inputElement = getByRole('button');
    expect(inputElement).toBeInTheDocument();
  });
});
