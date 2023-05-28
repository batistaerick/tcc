import { atom } from 'recoil';

export const selectedDateAtom = atom({
  key: 'selectedDate',
  default: new Date(),
});
