import { atom } from 'recoil';

export const selectedDateAtom = atom<Date>({
  key: 'selectedDate',
  default: new Date(),
});
