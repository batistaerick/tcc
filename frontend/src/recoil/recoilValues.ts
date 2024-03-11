import { ResponseError, Transaction } from '@/types/types';
import { atom } from 'recoil';

export const selectedDateAtom = atom<Date>({
  key: 'selected-date',
  default: new Date(),
});

export const responseErrorAtom = atom<ResponseError | undefined>({
  key: 'response-error',
  default: undefined,
});

export const newTransactionAtom = atom<boolean>({
  key: 'new-transaction',
  default: false,
});

export const transactionFormAtom = atom<Transaction>({
  key: 'transaction-form',
  default: {
    id: undefined,
    user: undefined,
    value: undefined,
    category: '',
    notes: '',
    date: undefined,
    transactionType: undefined,
  },
});
