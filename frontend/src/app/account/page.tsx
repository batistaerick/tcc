'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import dynamic from 'next/dynamic';

export default function Account() {
  const ProfileComponent = dynamic(() => import('@/components/Profile'));

  return (
    <DefaultBackground>
      <ProfileComponent />
      <ModalError />
    </DefaultBackground>
  );
}
