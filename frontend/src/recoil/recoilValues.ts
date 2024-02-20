import { ResponseError } from '@/types/types';
import { atom } from 'recoil';

export const selectedDateAtom = atom<Date>({
  key: 'selectedDate',
  default: new Date(),
});

export const responseErrorAtom = atom<ResponseError | undefined>({
  key: 'responseError',
  default: undefined,
});
