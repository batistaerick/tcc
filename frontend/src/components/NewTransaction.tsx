import Button from '@/components/Button';
import DatePickerDialog from '@/components/DatePickerDialog';
import Input from '@/components/Input';
import { useModal } from '@/components/Modals/ModalContext';
import usePredictions from '@/hooks/usePrediction';
import { postFetcher, putFetcher } from '@/libs/fetchers';
import {
  newTransactionAtom,
  responseErrorAtom,
  selectedDateAtom,
  transactionFormAtom,
} from '@/recoil/recoilValues';
import { Transaction } from '@/types/types';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FcCurrencyExchange, FcIdea, FcSurvey } from 'react-icons/fc';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

export interface NewTransactionProps {
  mutateAll?: () => Promise<void>;
}

export default function NewTransaction({
  mutateAll,
}: Readonly<NewTransactionProps>) {
  const [isNewTransactionOpen, setIsNewTransactionOpen] =
    useRecoilState(newTransactionAtom);
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);
  const [form, setForm] = useRecoilState(transactionFormAtom);
  const resetNewTransaction = useResetRecoilState(transactionFormAtom);
  const setResponseError = useSetRecoilState(responseErrorAtom);
  const { openModal } = useModal();
  const { t } = useTranslation();
  const { mutate: predictionMutate } = usePredictions();

  useEffect(
    () =>
      setForm((prevTransaction) => ({
        ...prevTransaction,
        date: new Date(selectedDate),
      })),
    [selectedDate, setForm]
  );

  const onSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        if (form.id) {
          await putFetcher<Transaction>('/transactions', form);
        } else {
          await postFetcher<Transaction>('/transactions', form);
        }
        await predictionMutate();
        await mutateAll?.();
        setIsNewTransactionOpen((prev) => !prev);
        resetNewTransaction();
      } catch (error: any) {
        setResponseError(error?.response?.data);
        openModal();
      }
    },
    [
      form,
      resetNewTransaction,
      predictionMutate,
      mutateAll,
      setIsNewTransactionOpen,
      openModal,
      setResponseError,
    ]
  );

  function handleChange({
    currentTarget: { value, id },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  }

  return (
    <>
      {isNewTransactionOpen && (
        <div
          className={`
            absolute flex h-full w-full items-center justify-center
            bg-black bg-opacity-80 backdrop-blur-sm
          `}
        >
          <div className="flex w-11/12 flex-col items-center justify-center gap-2 md:w-8/12 lg:w-6/12">
            <div className="flex items-center justify-center">
              <DatePickerDialog date={selectedDate} setDate={setSelectedDate} />
            </div>
            <form
              className="flex w-full flex-col gap-5 rounded-lg bg-slate-700 bg-opacity-35 p-5"
              id="newTransactionForm"
              onSubmit={onSubmit}
            >
              <div>
                <FcCurrencyExchange className="mb-1" size={25} />
                <Input
                  id="value"
                  label={t('newTransaction:value')}
                  type="number"
                  value={form.value}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FcIdea className="mb-1" size={25} />
                <Input
                  id="category"
                  label={t('newTransaction:category')}
                  type="text"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FcSurvey className="mb-1" size={25} />
                <Input
                  id="notes"
                  label={t('newTransaction:notes')}
                  type="text"
                  value={form?.notes}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-zinc-300" htmlFor="transactionType">
                  {t('newTransaction:transactionType')}
                </label>
                <select
                  id="transactionType"
                  className={`
                    w-44 rounded-md border border-neutral-700 bg-neutral-700 p-3
                    ${form.transactionType ? 'text-white' : 'text-zinc-400'}
                  `}
                  value={form?.transactionType ?? ''}
                  onChange={handleChange}
                >
                  <option value="">{t('newTransaction:chooseType')}</option>
                  <option value="EXPENSE">
                    {t('newTransaction:expenseOption')}
                  </option>
                  <option value="INCOME">
                    {t('newTransaction:incomeOption')}
                  </option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-zinc-300" htmlFor="repeats">
                  {t('newTransaction:repeats')}
                </label>
                <select
                  id="repeats"
                  className={`
                    w-44 rounded-md border border-neutral-700 bg-neutral-700 p-3
                    ${form.repeats ? 'text-white' : 'text-zinc-400'}
                  `}
                  value={form?.repeats ?? ''}
                  onChange={handleChange}
                >
                  <option value="">{t('newTransaction:chooseType')}</option>
                  <option value="DAILY">{t('newTransaction:daily')}</option>
                  <option value="WEEKLY">{t('newTransaction:weekly')}</option>
                  <option value="MONTHLY">{t('newTransaction:monthly')}</option>
                </select>
              </div>
            </form>
            <div className="flex w-full items-center justify-center gap-2">
              <Button
                type="button"
                height="h-12"
                width="w-full"
                translation={t('newTransaction:cancel')}
                onClick={() => {
                  resetNewTransaction();
                  setIsNewTransactionOpen((prev) => !prev);
                }}
              />
              <Button
                type="submit"
                form="newTransactionForm"
                height="h-12"
                width="w-full"
                translation={t('newTransaction:save')}
                disabled={
                  form.value === 0 ||
                  form.category === '' ||
                  form.transactionType === undefined
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
