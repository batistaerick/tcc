import { Meta, StoryObj } from '@storybook/react';
import DatePickerDialog, { DatePickerDialogProps } from './DatePickerDialog';

export default {
  title: 'Components/DatePickerDialog',
  component: DatePickerDialog,
  args: { date: new Date(), setDate: () => {} },
} as Meta<DatePickerDialogProps>;

export const Default: StoryObj<DatePickerDialogProps> = {
  args: { dateFormat: 'dd/MMMM/yyyy', showMonthYearPicker: true },
};
