'use client';
import usePredictions from '@/hooks/usePrediction';
import { useState } from 'react';
import DatePickerDialog from './DatePickerDialog';

export default function Prediction() {
  const [date, setDate] = useState(new Date());
  const { data: predictionValue } = usePredictions(date);

  return (
    <div className="my-3 flex">
      <div className="mx-5 h-24 w-full rounded-xl bg-gray-600">
        <div className="flex h-full items-center justify-center gap-16">
          <div className="w-20 border-b-2">
            <div className="font-bold text-green-500">Prediction</div>
            <DatePickerDialog
              date={date}
              setDate={setDate}
              dateFormat="MMMM/yyyy"
              showMonthYearPicker
            />
          </div>
          <div
            className={`
              flex h-full w-24 items-center justify-center text-2xl font-bold
              ${predictionValue >= 0 ? 'text-green-500' : 'text-red-500'}
            `}
          >
            ${predictionValue}
          </div>
        </div>
      </div>
    </div>
  );
}
