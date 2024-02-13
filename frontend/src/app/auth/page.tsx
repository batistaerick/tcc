'use client';
import Login from '@/components/Login';
import ModalError from '@/components/Modals/ModalError';

export default function Auth() {
  return (
    <>
      <Login />
      <ModalError />
    </>
  );
}
