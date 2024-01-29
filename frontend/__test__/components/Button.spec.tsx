import Button from '@/components/Button';
import { fireEvent, render } from '@testing-library/react';

describe('Button', () => {
  it('should render the button with the correct translation', () => {
    const { getByRole } = render(<Button translation="Click me!" />);
    expect(getByRole('button')).toHaveTextContent('Click me!');
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button translation="Click me!" onClick={handleClick} />
    );
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is true', () => {
    const { getByRole } = render(<Button translation="Click me!" disabled />);
    expect(getByRole('button')).toBeDisabled();
  });
});
