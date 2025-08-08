import { style } from '@vanilla-extract/css';
import { theme } from '../../theme/theme.css';

export const formErrorTextStyle = style({
  ...theme.typography['body.xs'],
  color: theme.colors.error,
  display: 'flex',
});
