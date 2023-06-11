import { atom } from 'recoil';

export const selectedDateAtom = atom({
  key: 'selectedDate',
  default: new Date(),
});

export const predictionDateAtom = atom({
  key: 'predictionDate',
  default: new Date(),
});
