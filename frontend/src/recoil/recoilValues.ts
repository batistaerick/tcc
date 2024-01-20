import { ResponseError } from '@/types/types';
import { atom } from 'recoil';

export const selectedDateAtom = atom<Date>({
  key: 'selectedDate',
  default: new Date(),
});

export const isOpenModalAtom = atom<boolean>({
  key: 'isOpen',
  default: false,
});

export const responseErrorAtom = atom<ResponseError>({
  key: 'responseError',
  default: undefined,
});
