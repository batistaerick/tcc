import Language from '@/components/Language';
import { fireEvent, render } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

describe('Language component', () => {
  it('should render the language buttons with correct styles', () => {
    const { getByText } = render(<Language />);
    const enButton = getByText('EN');
    const ptButton = getByText('PT');

    expect(enButton).toHaveClass('bg-slate-400');
    expect(ptButton).toHaveClass('bg-slate-300');
  });

  it('should call changeLanguage when a different language button is clicked', () => {
    const { getByText } = render(<Language />);
    const ptButton = getByText('PT');

    fireEvent.click(ptButton);

    expect(useTranslation().i18n.changeLanguage).toHaveBeenCalledWith('pt');
  });
});
