import Button from '@/components/Button';
import { fireEvent, render } from '@testing-library/react';

describe('Button', () => {
  it('should renders the button with the correct translation', () => {
    const translation = 'Click me';
    const { getByText } = render(<Button translation={translation} />);
    const button = getByText(translation);
    expect(button).toBeInTheDocument();
  });

  it('should calls the onClick event handler when the button is clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button translation="Click me" onClick={onClick} />
    );
    const button = getByText('Click me');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('should disables the button when the disabled prop is true', () => {
    const { getByText } = render(<Button translation="Click me" disabled />);
    const button = getByText('Click me');
    expect(button).toBeDisabled();
  });

  it('should applies the correct CSS classes based on the disabled prop', () => {
    const { getByText, rerender } = render(
      <Button translation="Click me" disabled />
    );
    const button = getByText('Click me');
    expect(button).toHaveClass('bg-slate-400');

    rerender(<Button translation="Click me" disabled={false} />);
    expect(button).toHaveClass('bg-indigo-800 hover:bg-indigo-900');
  });

  it('should passes the correct type prop to the button element', () => {
    const { container } = render(
      <Button translation="Click me" type="submit" />
    );
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should passes the correct form prop to the button element', () => {
    const { container } = render(
      <Button translation="Click me" form="my-form" />
    );
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('form', 'my-form');
  });

  it('should applies the correct height and width CSS classes', () => {
    const { getByText } = render(
      <Button translation="Click me" height="h-10" width="w-20" />
    );
    const button = getByText('Click me');
    expect(button).toHaveClass('h-10 w-20');
  });
});
