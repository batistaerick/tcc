'use client';
import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import NewTransaction from './NewTransaction';

export default function AddButton() {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  return (
    <>
      <IoMdAddCircle
        className="fixed bottom-4 right-0 p-3 text-indigo-800 cursor-pointer"
        size={75}
        onClick={() => setIsTransactionOpen(!isTransactionOpen)}
      />
      <NewTransaction
        isOpen={isTransactionOpen}
        setIsOpen={setIsTransactionOpen}
      />
    </>
  );
}
