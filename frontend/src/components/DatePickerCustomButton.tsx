import { ForwardedRef, ReactNode, forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerCustomButtonProps {
  value?: ReactNode;
  onClick?: () => void;
}

const DatePickerCustomButton = forwardRef(
  (
    { value, onClick }: DatePickerCustomButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <button onClick={onClick} ref={ref}>
      {value}
    </button>
  )
);

DatePickerCustomButton.displayName = 'DatePickerCustomButton';

export default DatePickerCustomButton;
