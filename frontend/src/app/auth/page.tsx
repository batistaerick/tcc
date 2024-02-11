'use client';
import DefaultBackground from '@/components/DefaultBackground';
import Login from '@/components/Login';
import ModalError from '@/components/Modals/ModalError';

export default function Auth() {
  return (
    <DefaultBackground>
      <Login />
      <ModalError />
    </DefaultBackground>
  );
}
