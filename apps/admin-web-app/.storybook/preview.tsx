import { darkThemeClass, lightThemeClass, theme } from '@repo/ui';
import type { Preview } from '@storybook/react-vite';
// biome-ignore lint/correctness/noUnusedImports: need react
import React, { useEffect } from 'react';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const mode = context.globals.themeMode;
      const canvasEl = context.canvasElement;

      useEffect(() => {
        canvasEl.style.backgroundColor = theme.colors['background.primary'];
        canvasEl.classList.remove(darkThemeClass, lightThemeClass);
        canvasEl.classList.add(
          mode === 'light' ? lightThemeClass : darkThemeClass
        );
      }, [mode, canvasEl]);

      return (
        <div style={{ padding: '1rem' }}>
          <Story />
        </div>
      );
    },
  ],
  globalTypes: {
    themeMode: {
      name: 'Theme',
      description: 'Global theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
};

export default preview;
