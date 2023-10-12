import Money from '@/components/Money';
import { render } from '@testing-library/react';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    i18n: { language: 'en' },
  }),
}));

describe('Money component', () => {
  it('should renders the formatted currency value', () => {
    const { container } = render(<Money value={1000} />);
    expect(container.textContent).toBe('$1,000.00');
  });

  it('should applies the provided className', () => {
    const { container } = render(
      <Money value={1000} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
