import ModalError from '@/components/ModalError';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';

export default {
  title: 'Components/ModalError',
  component: ModalError,
  decorators: [(Story) => <RecoilRoot>{Story()}</RecoilRoot>],
} as Meta;

export const Default: StoryObj = {};
