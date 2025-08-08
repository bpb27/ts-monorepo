import { style } from '@vanilla-extract/css';
import { theme } from '../../theme/theme.css';

export const fieldLabelStyle = style({
  ...theme.typography.label,
  fontWeight: theme.fontWeight.semibold,
  display: 'flex',
});

export const fieldHelperTextStyle = style({
  ...theme.typography['body.xs'],
  color: theme.colors['text.secondary'],
  display: 'flex',
});

export const fieldErrorTextStyle = style({
  ...theme.typography['body.xs'],
  color: theme.colors.error,
  display: 'flex',
});
