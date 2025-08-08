/*
  https://www.radix-ui.com/colors/custom
  blue: 4482FE
  gray: 8B8D98

  NB:
  - "contrast" indicates the ideal color for accessible text against the solid colors of the palette
  - the light/dark scales are chosen so the base colors can be swapped out and the semantic/component layer remains unchanged.
*/

const base = {
  light: {
    'blue.1': '#fcfdff',
    'blue.2': '#f5f9ff',
    'blue.3': '#ebf2ff',
    'blue.4': '#ddebff',
    'blue.5': '#cde1ff',
    'blue.6': '#bad3ff',
    'blue.7': '#a2c1fb',
    'blue.8': '#7fa8f6',
    'blue.9': '#4482fe',
    'blue.10': '#3c76eb',
    'blue.11': '#306ae0',
    'blue.12': '#163165',
    'blue.contrast': '#fff',
    'gray.1': '#fcfcfd',
    'gray.2': '#f9f9fb',
    'gray.3': '#eff0f3',
    'gray.4': '#e7e8ec',
    'gray.5': '#e0e1e6',
    'gray.6': '#d8d9e0',
    'gray.7': '#cdced7',
    'gray.8': '#b9bbc6',
    'gray.9': '#8b8d98',
    'gray.10': '#80828d',
    'gray.11': '#62636c',
    'gray.12': '#1e1f24',
    'gray.contrast': '#fff',
    'red.9': '#E54D2E',
    'red.contrast': '#fff',
    white: '#fff',
    black: '#000',
    'shadow.1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow.2':
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'shadow.3':
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'shadow.4':
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  dark: {
    'blue.1': '#08111f',
    'blue.2': '#0d1829',
    'blue.3': '#082451',
    'blue.4': '#022e6e',
    'blue.5': '#053883',
    'blue.6': '#0f4494',
    'blue.7': '#1751ab',
    'blue.8': '#1a60c9',
    'blue.9': '#165cc5',
    'blue.10': '#154fa8',
    'blue.11': '#80b6ff',
    'blue.12': '#cce3ff',
    'blue.contrast': '#fff',
    'gray.1': '#111113',
    'gray.2': '#19191b',
    'gray.3': '#222325',
    'gray.4': '#292a2e',
    'gray.5': '#303136',
    'gray.6': '#393a40',
    'gray.7': '#46484f',
    'gray.8': '#5f606a',
    'gray.9': '#6c6e79',
    'gray.10': '#797b86',
    'gray.11': '#b2b3bd',
    'gray.12': '#eeeef0',
    'gray.contrast': '#fff',
    'red.9': '#E54D2E',
    'red.contrast': '#fff',
    white: '#000',
    black: '#fff',
    'shadow.1': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    'shadow.2':
      '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    'shadow.3':
      '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    'shadow.4':
      '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  },
} as const;

// If there's not a perfect light/dark inversion, use a conditional

const semantic = (mode: 'light' | 'dark') => {
  const baseColors = base[mode];
  return {
    'text.primary': baseColors['gray.12'],
    'text.secondary': baseColors['gray.11'],
    'text.tertiary': baseColors['gray.10'],
    'text.interactive': baseColors['blue.contrast'],
    'text.interactive.inverse': baseColors['blue.11'],
    'background.primary': baseColors['gray.1'],
    'background.secondary': baseColors['gray.2'],
    'background.tertiary': baseColors['gray.3'],
    'background.interactive':
      mode === 'light' ? baseColors['blue.11'] : baseColors['blue.9'],
    'background.interactive.hover': baseColors['blue.10'],
    'background.interactive.inverse': 'transparent',
    'background.interactive.inverse.hover': baseColors['blue.2'],
    'background.input':
      mode === 'light' ? baseColors.white : baseColors['gray.8'],
    'border.default': baseColors['gray.4'],
    'border.strong': baseColors['gray.5'],
    'focusRing.interactive': baseColors['blue.11'],
    error: baseColors['red.9'],
    'shadow.sm': baseColors['shadow.1'],
    'shadow.md': baseColors['shadow.2'],
    'shadow.lg': baseColors['shadow.3'],
    'shadow.xl': baseColors['shadow.4'],
  } as const;
};

export const colors = { base, semantic };
