import '@/app/globals.css';
import '@/i18n/i18n';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    nextjs: { appDirectory: true },
  },
};

export default preview;
