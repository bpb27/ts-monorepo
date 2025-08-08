import { createTheme } from '@vanilla-extract/css';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

const generalTokens = {
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  borderRadii: {
    none: '0',
    small: '2px',
    medium: '4px',
    large: '8px',
    full: '9999px',
  },
  navHeight: '56px',
} as const;

export const [lightThemeClass, theme] = createTheme({
  ...generalTokens,
  colors: colors.semantic('light'),
  spacing: spacing.semantic(),
  typography: typography.semantic(),
});

export const darkThemeClass = createTheme(theme, {
  ...generalTokens,
  colors: colors.semantic('dark'),
  spacing: spacing.semantic(),
  typography: typography.semantic(),
});
