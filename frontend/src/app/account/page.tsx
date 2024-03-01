'use client';
import DefaultBackground from '@/components/DefaultBackground';
import ModalError from '@/components/Modals/ModalError';
import dynamic from 'next/dynamic';

const ProfileComponent = dynamic(() => import('@/components/Profile'));

export default function Account() {
  return (
    <DefaultBackground>
      <ProfileComponent />
      <ModalError />
    </DefaultBackground>
  );
}
