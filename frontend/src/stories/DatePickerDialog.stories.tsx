import DatePickerDialog, {
  DatePickerDialogProps,
} from '@/components/DatePickerDialog';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/DatePickerDialog',
  component: DatePickerDialog,
  args: { date: new Date(), setDate: () => {} },
} as Meta<DatePickerDialogProps>;

export const Default: StoryObj<DatePickerDialogProps> = {
  args: { dateFormat: 'dd/MMMM/yyyy', showMonthYearPicker: true },
};
