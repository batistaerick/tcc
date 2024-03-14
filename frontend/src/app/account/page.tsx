'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import Profile from '@/components/Profile';

export default function Account() {
  return (
    <DefaultBackground style="flex flex-col items-center justify-center gap-2">
      <Profile />
      <ModalError />
    </DefaultBackground>
  );
}
